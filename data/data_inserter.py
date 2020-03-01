import datetime
import os
import sys

import requests
from psycopg2 import DataError, sql

import init_db
from data_manager import execute_select, execute_dml_statement

import tmdbsimple as tmdb

headers = {
    'Content-Type': 'application/json',
    'trakt-api-version': '2',
    'trakt-api-key': os.environ.get('TRAKT_API_KEY')
}
TRAKT_API_URL = 'https://api.trakt.tv'
TMDB_MAX_SHOW_COUNT = 19999
tmdb.API_KEY = os.environ.get('TMDB_API_KEY')
ACTOR_TYPE = {
    'episode': {'table': 'episode_characters', 'id': 'episode_id'},
    'season': {'table': 'season_characters', 'id': 'season_id'},
    'show': {'table': 'show_characters', 'id': 'show_id'},
}
START_WITH = 0


def main():
    # init_db.init_db()
    # init_db.create_schema()
    # insert_genres()
    # insert_shows(max_show_count=1000)
    update_actors()
    # print('Season data inserted')


def insert_genres():
    genres = tmdb.Genres().tv_list()["genres"]
    genres += tmdb.Genres().movie_list()["genres"]
    genres = {x['id']: x for x in genres}.values()

    i = 0
    for i, genre in enumerate(genres):
        statement = "INSERT INTO genres (id, name) VALUES (%(id)s, %(name)s) ON CONFLICT DO NOTHING;"
        execute_dml_statement(statement, genre)
        progress_bar(i, len(genres), prefix='Inserting genres:')

    clear_progress_bar('Inserted ' + str(i) + ' genres')


def insert_shows(max_show_count=1000):
    max_show_count = max(1, min(max_show_count, TMDB_MAX_SHOW_COUNT))

    result_page = 1
    total_counter = 0
    while total_counter < max_show_count:
        result_set = tmdb.TV().popular(page=result_page)['results']
        result_page += 1

        for show in result_set:
            progress_bar(total_counter, max_show_count, prefix='Inserting shows:', suffix=show['name'])

            if total_counter < START_WITH:
                total_counter += 1
                continue

            # Some shorts have no id, some has no date, etc... Skip these
            if show['id'] is None or show['first_air_date'] is None:
                print('Some data is missing for ' + show['title'] + '. Skipping this show...')

            statement = """
                INSERT INTO shows (id, title, air_date, overview, rating)
                VALUES (%(id)s, %(name)s, %(first_air_date)s, %(overview)s, %(vote_average)s)
                ON CONFLICT DO NOTHING;
                """

            try:
                execute_dml_statement(statement, show)
            except DataError:
                print('Error while inserting ' + show['name'] + '. Skipping this show...')
            else:
                insert_genres_of_show(show['genre_ids'], show)
                insert_seasons_of_show(show['id'])

            total_counter += 1

            # If max_show_count is not dividable by the limit, we have to jump out before processing all received shows
            if total_counter >= max_show_count:
                break

    clear_progress_bar('Inserted ' + str(total_counter) + ' shows')


def insert_genres_of_show(genre_ids, show_entity):
    for genre_id in genre_ids:
        execute_dml_statement("""
            INSERT INTO show_genres (show_id, genre_id)
            VALUES (%(show_id)s, %(genre_id)s)
            ON CONFLICT DO NOTHING; """, {
            'show_id': show_entity['id'],
            'genre_id': genre_id
        })


def insert_seasons_of_show(show_id):
    show_details = tmdb.TV(show_id).info(append_to_response="credits")
    show_credits = show_details.get('credits', {})
    insert_actors_of_type('show', show_details['id'], show_credits.get('cast', []))
    for i, season_raw in enumerate(show_details['seasons']):
        statement = """
            INSERT INTO seasons (id, season_number, air_date, episode_count, poster_path, title, overview, show_id)
            VALUES (%(id)s, %(season_number)s, %(air_date)s, %(episode_count)s,
                    %(poster_path)s, %(name)s, %(overview)s, %(show_id)s)
            ON CONFLICT DO NOTHING;
        """
        season = get_season_entity(season_raw, show_id)
        execute_dml_statement(statement, season)
        insert_episodes_of_season(show_id, season['season_number'])
        progress_bar(i + 1, len(show_details['seasons']),
                     prefix='Inserting seasons:',
                     suffix=f"{show_details['name']} - {season['name']}")


def insert_episodes_of_season(show_id, season_number):
    season_details = tmdb.TV_Seasons(show_id, season_number).info(append_to_response="credits")
    episodes = season_details['episodes']

    season_credits = season_details.get('credits', {})
    insert_actors_of_type('season', season_details['id'], season_credits.get('cast', []))

    for i, episode in enumerate(episodes):
        stmt = """
            INSERT INTO episodes (id, title, episode_number, overview, season_id)
            VALUES (%(id)s, %(title)s, %(episode_number)s, %(overview)s, %(season_id)s)
            ON CONFLICT DO NOTHING;
        """
        execute_dml_statement(stmt, get_episode_entity(season_details["id"], episode))
        # episode_credits = tmdb.TV_Episodes(show_id, season_number, episode['episode_number']).credits()
        # insert_actors_of_type('episode', episode['id'], episode_credits.get('cast', []))
        progress_bar(i + 1, len(episodes),
                     prefix='Inserting episodes:',
                     suffix=f"{season_details['name']} - {episode['name']}")


def insert_actors_of_type(cast_type, type_id, cast):
    for actor in cast:
        insert_actor(actor)
        query = sql.SQL("""
            INSERT INTO {0} ({1}, actor_id, character_name)
            VALUES (%(type_id)s, %(actor_id)s, %(character_name)s)
            ON CONFLICT DO NOTHING;
        """).format(
            sql.Identifier(ACTOR_TYPE[cast_type]['table']),
            sql.Identifier(ACTOR_TYPE[cast_type]['id']),
        )
        execute_dml_statement(query, {
            'type_id': type_id,
            'actor_id': actor['id'],
            'character_name': actor['character']
        })


def insert_actor(actor):
    execute_dml_statement("""
        INSERT INTO actors
            (id, name, gender, profile_path, birthday, death, biography, popularity, place_of_birth, homepage)
        VALUES (%(id)s, %(name)s, %(gender)s, %(profile_path)s, %(birthday)s, %(death)s,
                        %(biography)s, %(popularity)s, %(place_of_birth)s, %(homepage)s)
        ON CONFLICT(id) DO UPDATE SET 
            (name, gender, profile_path, birthday, death, biography, popularity, place_of_birth, homepage)
            = (%(name)s, %(gender)s, %(profile_path)s, %(birthday)s, %(death)s,
                        %(biography)s, %(popularity)s, %(place_of_birth)s, %(homepage)s);
    """, {
        "id": actor.get('id', None),
        "name": actor.get('name', None),
        "gender": actor.get('gender', None),
        "profile_path": actor.get('profile_path', None),
        "birthday": actor.get('birthday', None),
        "death": actor.get('deathday', None),
        "biography": actor.get('biography', None),
        "popularity": actor.get('popularity', None),
        "place_of_birth": actor.get('place_of_birth', None),
        "homepage": actor.get('homepage', None),
    })


def update_actors():
    actors = execute_select("SELECT id FROM actors WHERE popularity ISNULL ORDER BY id")
    for i, actor in enumerate(actors):
        progress_bar(i, len(actors), prefix='Updating actors:')
        try:
            actor_data = tmdb.People(actor['id']).info(append_to_response="images")
        except requests.HTTPError:
            print(f"Error while updating actor with id: {actor['id']} Skipping this actor...")
        else:
            insert_actor(actor_data)


def get_show_entity(show):
    show_entity = {
        'id': show['id'],
        'title': show['title'],
        'air_date': show['first_air_date'] if show['first_air_date'] != '' else None,
        'overview': show['overview'],
        'runtime': show['runtime'],
        'trailer': show['trailer'],
        'homepage': show['homepage'],
        'genres': show['genres'],
        'rating': show['rating']
    }
    try:
        show_entity['year'] = datetime.date(show['year'], 1, 1)
    except TypeError:
        pass
    return show_entity

    # "backdrop_path": "/gX8SYlnL9ZznfZwEH4KJUePBFUM.jpg",
    # "episode_run_time": [60],
    # "first_air_date": "2011-04-17",
    # "homepage": "http://www.hbo.com/game-of-thrones",
    # "id": 1399,
    # "in_production": true,
    # "languages": ["es", "en", "de"],
    # "last_air_date": "2017-08-27",
    # "name": "Game of Thrones",
    # "number_of_episodes": 67,
    # "number_of_seasons": 7,
    # "origin_country": ["US"],
    # "original_language": "en",
    # "original_name": "Game of Thrones",
    # "overview": "Seven noble families...",
    # "popularity": 53.516,
    # "poster_path": "/gwPSoYUHAKmdyVywgLpKKA4BjRr.jpg",
    # "status": "Returning Series",
    # "type": "Scripted",
    # "vote_average": 8.2,
    # "vote_count": 4682


def get_season_entity(season, show_id):
    return {
        'id': season['id'],
        'season_number': season['season_number'],
        'name': season['name'],
        'overview': season['overview'],
        'episode_count': season['episode_count'],
        'poster_path': season['poster_path'],
        'air_date': season['air_date'],
        'show_id': show_id
    }


def get_episode_entity(season_id, episode):
    return {
        'id': episode['id'],
        'title': episode['name'],
        'episode_number': episode['episode_number'],
        'overview': episode['overview'],
        'season_id': season_id
    }


# original: https://stackoverflow.com/a/27871113/2205458
def progress_bar(count, total, prefix='', suffix=''):
    max_prefix_length = 20
    max_suffix_length = 35
    terminal_width = get_terminal_width()
    prefix = trim_string(prefix, max_prefix_length)
    suffix = trim_string(suffix, max_suffix_length, False)
    bar_length = terminal_width - 18 - max_prefix_length - max_suffix_length - (len(str(total)) * 2)
    filled_len = int(round(bar_length * count / float(total)))

    # changes shape in every 0.33 sec
    spinner = ['⋮', '⋯', '⋰', '⋱'][int(float(datetime.datetime.utcnow().strftime("%s.%f")) * 3) % 4]

    sys.stdout.write(
        ' {prefix} ▐{bar}▌ {percents: >5}% ({count: >{counter_length}}/{total}) {spinner} {suffix}\r'.format(
            prefix=prefix,
            bar='◼' * filled_len + '◻' * (bar_length - filled_len),
            percents=round(100.0 * count / float(total), 1),
            count=count,
            total=total,
            spinner=spinner,
            counter_length=len(str(total)),
            suffix=suffix
        ))
    sys.stdout.flush()


def get_terminal_width():
    try:
        return int(os.get_terminal_size(0)[0])
    except OSError:
        return 80


def trim_string(text, length, align_right=True):
    if len(text) > length:
        return '{0: <{length}}'.format(text[:(length - 2)] + '..', length=length)
    else:
        return text.rjust(length) if align_right else text.ljust(length)


def clear_progress_bar(text=''):
    print(text + ' ' * (get_terminal_width() - len(text)))


if __name__ == '__main__':
    main()
