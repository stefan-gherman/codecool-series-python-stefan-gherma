DROP TABLE IF EXISTS show_genres;
DROP TABLE IF EXISTS show_characters;
DROP TABLE IF EXISTS season_characters;
DROP TABLE IF EXISTS episode_characters;
DROP TABLE IF EXISTS episodes;
DROP TABLE IF EXISTS genres;
DROP TABLE IF EXISTS actors;
DROP TABLE IF EXISTS seasons;
DROP TABLE IF EXISTS shows;

CREATE TABLE shows
(
  id       INTEGER      NOT NULL
    CONSTRAINT shows_pkey
      PRIMARY KEY,
  title    VARCHAR(200) NOT NULL,
  air_date DATE,
  overview TEXT,
  runtime  SMALLINT,
  trailer  VARCHAR(200),
  homepage VARCHAR(200),
  rating   NUMERIC
);


CREATE TABLE genres
(
  id   SERIAL      NOT NULL
    CONSTRAINT genres_pkey
      PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);


CREATE TABLE actors
(
  id             INTEGER      NOT NULL
    CONSTRAINT actors_pkey
      PRIMARY KEY,
  name           VARCHAR(200) NOT NULL,
  gender         SMALLINT,
  profile_path   VARCHAR(200),
  birthday       DATE,
  death          DATE,
  biography      TEXT,
  popularity     FLOAT,
  place_of_birth VARCHAR(200),
  homepage       VARCHAR(200)
);


CREATE TABLE seasons
(
  id            INTEGER  NOT NULL
    CONSTRAINT seasons_pkey
      PRIMARY KEY,
  season_number SMALLINT NOT NULL,
  air_date      DATE,
  title         VARCHAR(200),
  poster_path   VARCHAR(200),
  overview      TEXT,
  episode_count INTEGER,
  show_id       INTEGER  NOT NULL
    CONSTRAINT fk_seasons_show_id
      REFERENCES shows
);


CREATE TABLE show_genres
(
  id       SERIAL  NOT NULL
    CONSTRAINT show_genres_pkey
      PRIMARY KEY,
  show_id  INTEGER NOT NULL
    CONSTRAINT fk_show_genres_show_id
      REFERENCES shows,
  genre_id INTEGER NOT NULL
    CONSTRAINT fk_show_genres_genre_id
      REFERENCES genres
);


CREATE TABLE episodes
(
  id             INTEGER  NOT NULL
    CONSTRAINT episodes_pkey
      PRIMARY KEY,
  title          VARCHAR(300),
  episode_number SMALLINT NOT NULL,
  overview       TEXT,
  season_id      INTEGER  NOT NULL
    CONSTRAINT fk_episodes_season_id
      REFERENCES seasons
);


CREATE TABLE show_characters
(
  id             SERIAL       NOT NULL
    CONSTRAINT show_characters_pkey
      PRIMARY KEY,
  show_id        INTEGER      NOT NULL
    CONSTRAINT fk_show_characters_show_id
      REFERENCES shows,
  actor_id       INTEGER      NOT NULL
    CONSTRAINT fk_show_characters_actor_id
      REFERENCES actors,
  character_name VARCHAR(200) NOT NULL
);


CREATE TABLE season_characters
(
  id             SERIAL       NOT NULL
    CONSTRAINT season_characters_pkey
      PRIMARY KEY,
  season_id      INTEGER      NOT NULL
    CONSTRAINT fk_season_characters_season_id
      REFERENCES seasons,
  actor_id       INTEGER      NOT NULL
    CONSTRAINT fk_season_characters_actor_id
      REFERENCES actors,
  character_name VARCHAR(200) NOT NULL
);

CREATE TABLE episode_characters
(
  id             SERIAL       NOT NULL
    CONSTRAINT episode_characters_pkey
      PRIMARY KEY,
  episode_id     INTEGER      NOT NULL
    CONSTRAINT fk_episode_characters_episode_id
      REFERENCES episodes,
  actor_id       INTEGER      NOT NULL
    CONSTRAINT fk_episode_characters_actor_id
      REFERENCES actors,
  character_name VARCHAR(200) NOT NULL
);

