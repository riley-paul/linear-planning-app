DROP TABLE IF EXISTS maps CASCADE;

CREATE TABLE projects (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date_created DATE NOT NULL DEFAULT Now(),
  name varchar(255) NOT NULL DEFAULT 'Untitled Project',
  description TEXT
);