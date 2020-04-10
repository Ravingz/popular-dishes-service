-- GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'password';

DROP DATABASE IF EXISTS popularitems;

CREATE DATABASE popularitems;

\c popularitems;

CREATE TABLE restaurants (
   id SERIAL PRIMARY KEY,
   name text
);

CREATE TABLE items (
   id SERIAL PRIMARY KEY,
   name text,
   restaurant_id INT,
   price DECIMAL,
   FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

CREATE TABLE users (
   id SERIAL PRIMARY KEY,
   firstname VARCHAR,
   lastname VARCHAR,
   follower_count INT,
   created TIMESTAMPTZ,
);
CREATE TABLE photos (
   id SERIAL PRIMARY KEY,
   url text,
   caption text,
   user_id INT,
   item_id INT,
   uploaded TIMESTAMPTZ,
   FOREIGN KEY (user_id) REFERENCES users(id),
   FOREIGN KEY (item_id) REFERENCES items(id)
);

CREATE TABLE reviews (
   id SERIAL PRIMARY KEY,
   comment text,
   rating INT,
   item_id INT,
   user_id INT,
   created TIMESTAMPTZ,
   updated TIMESTAMPTZ,
   FOREIGN KEY (user_id) REFERENCES users(id),
   FOREIGN KEY (item_id) REFERENCES items(id)
);
