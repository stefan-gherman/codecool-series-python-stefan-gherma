from data import data_manager


def get_shows():
    return data_manager.execute_select(
        "SELECT shows.title, shows.id, show_genres.show_id, show_genres.genre_id, genres.name, shows.year, round(shows.rating,2) as rtg , round(avg(shows.runtime),2) as run_time FROM shows left JOIN show_genres on shows.id = show_genres.show_id left JOIN genres on show_genres.genre_id = genres.id GROUP BY shows.title, shows.id, show_genres.show_id, show_genres.genre_id, genres.name, shows.year, shows.rating order by shows.id;")


def get_shows_with_param(param, ordering):
    return data_manager.execute_select(
        f"SELECT shows.title, shows.id, show_genres.show_id, show_genres.genre_id, genres.name, shows.year, round(shows.rating,2) as rtg , round(avg(shows.runtime),2) as run_time FROM shows  left JOIN show_genres on shows.id = show_genres.show_id left JOIN genres on show_genres.genre_id = genres.id GROUP BY shows.title, shows.id, show_genres.show_id, show_genres.genre_id, genres.name, shows.year, shows.rating  order by {param} {ordering};")


