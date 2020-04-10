DROP KEYSPACE IF EXISTS ravingz; 

CREATE KEYSPACE ravingz WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE ravingz;

CREATE TABLE ravingz.restaurants (
    rest_id int,
    rest_name text, 
    item_id int,
    item_name text,
    item_price decimal,
    photo_id text,
    photo_caption text,
    photo_url text,
    rev_id int,
    rev_comment text,
    rev_created TIMESTAMP,
    rev_rating int,
    user_id int,
    user_firstname text,
    user_lastname text, 
    user_follower_count int,
    PRIMARY KEY (rest_id, item_id)
);