CREATE TABLE IF NOT EXISTS users (
  "id" INTEGER PRIMARY KEY asc,
  "name" VARCHAR(100) NOT NULL UNIQUE,
  "age" INTEGER NOT NULL,
  "major" VARCHAR(100) NOT NULL UNIQUE,
);