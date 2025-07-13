CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  age INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CHECK (LENGTH(username) >= 3),
  CHECK (LENGTH(first_name) >= 3),
  CHECK (LENGTH(last_name) >= 3),
  CHECK (age > 0)
);