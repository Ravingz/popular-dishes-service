-- GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'password';

DROP DATABASE IF EXISTS popularitems;

CREATE DATABASE popularitems;

\c popularitems;

CREATE TABLE restaurants (
   id SERIAL PRIMARY KEY NOT NULL,
   name text NOT NULL
);

CREATE TABLE items (
   id SERIAL PRIMARY KEY NOT NULL,
   name text NOT NULL,
   restaurant_id INT NOT NULL,
   price DECIMAL NOT NULL,
   FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

CREATE TABLE users (
   id SERIAL PRIMARY KEY NOT NULL,
   firstname VARCHAR NOT NULL,
   lastname VARCHAR NOT NULL,
   follower_count INT NOT NULL,
   created TIMESTAMPTZ NOT NULL
);

CREATE TABLE photos (
   id SERIAL PRIMARY KEY NOT NULL,
   url text NOT NULL,
   caption text NOT NULL,
   user_id INT NOT NULL,
   item_id INT NOT NULL,
   uploaded TIMESTAMPTZ NOT NULL,
   FOREIGN KEY (user_id) REFERENCES users(id),
   FOREIGN KEY (item_id) REFERENCES items(id)
);

CREATE TABLE reviews (
   id SERIAL PRIMARY KEY NOT NULL,
   comment text NOT NULL,
   rating INT NOT NULL,
   item_id INT NOT NULL,
   user_id INT NOT NULL,
   created TIMESTAMPTZ NOT NULL,
   updated TIMESTAMPTZ NOT NULL,
   FOREIGN KEY (user_id) REFERENCES users(id),
   FOREIGN KEY (item_id) REFERENCES items(id)
);

CREATE INDEX CONCURRENTLY reviews_user_id ON reviews USING HASH ("user_id");
CREATE INDEX CONCURRENTLY photos_item_id ON photos USING HASH ("item_id");
CREATE INDEX CONCURRENTLY items_restaurant_id ON items USING HASH ("restaurant_id");
CREATE INDEX CONCURRENTLY reviews_item_id ON reviews USING HASH ("item_id");
CREATE INDEX CONCURRENTLY photos_user_id ON photos USING HASH ("user_id");
