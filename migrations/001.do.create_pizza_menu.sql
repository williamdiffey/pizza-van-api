CREATE TABLE pizza_menu (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    pizzaname TEXT NOT NULL UNIQUE,
    img TEXT,
    blurb TEXT
);
