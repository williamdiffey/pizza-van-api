CREATE TABLE pizza_users (
  id TEXT,
  user_name TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);
