from data import data_manager


def get_shows():
    return data_manager.execute_select(
        "SELECT shows.title, shows.id, show_genres.show_id, show_genres.genre_id, genres.name, shows.year, round(shows.rating,2) as rtg , round(avg(shows.runtime),2) as run_time FROM shows left JOIN show_genres on shows.id = show_genres.show_id left JOIN genres on show_genres.genre_id = genres.id GROUP BY shows.title, shows.id, show_genres.show_id, show_genres.genre_id, genres.name, shows.year, shows.rating order by shows.id;")


def get_shows_with_param(param, ordering):
    return data_manager.execute_select(
        f"SELECT shows.title, shows.id, show_genres.show_id, show_genres.genre_id, genres.name, shows.year, round(shows.rating,2) as rtg , round(avg(shows.runtime),2) as run_time FROM shows  left JOIN show_genres on shows.id = show_genres.show_id left JOIN genres on show_genres.genre_id = genres.id GROUP BY shows.title, shows.id, show_genres.show_id, show_genres.genre_id, genres.name, shows.year, shows.rating  order by {param} {ordering};")


def get_show_from_id(show_id):
    return data_manager.execute_select(
        f" SELECT shows.title, shows.id, shows.year, shows.overview, shows.trailer, array_agg(distinct  genres.name) as genres "
        f" FROM shows "
        f" LEFT join show_genres ON shows.id = show_genres.show_id"
        f" LEFT JOIN genres ON show_genres.genre_id = genres.id"
        f" where shows.id = {show_id}"
        f" GROUP BY shows.title, shows.id, shows.year, shows.overview, shows.trailer;"
    )


def get_cast_for_show(show_id):
    return data_manager.execute_select(
        f" SELECT array_agg(actors.name) as actors, array_agg(show_characters.character_name) as characters"
        f" FROM actors "
        f" JOIN show_characters ON actors.id = show_characters.actor_id"
        f" JOIN shows ON show_characters.show_id = shows.id"
        f" WHERE shows.id = {show_id}"
        f" GROUP BY shows.id;"
    )

def get_seasons_for_show(show_id):
    return data_manager.execute_select(
        f" SELECT seasonS.title, seasons.overview, seasons.id, array_agg(episodes.episode_number order by episodes.episode_number ) "
        f" as episode_number, array_agg(episodes.title order by episodes.episode_number ) as episode_title, "
        f" array_agg(episodes.overview order by episodes.episode_number) as episode_description "
        f" FROM seasons "
        f" JOIN episodes  ON seasons.id = episodes.season_id JOIN shows on seasons.show_id = shows.id "
        f" WHERE shows.id = {show_id} "
        f" GROUP BY seasons.title, seasons.overview, seasons.id"
        f" ORDER BY CAST(seasons.season_number as int);"
    )