CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);
-- Default user
INSERT INTO users (username,password) VALUES ("usuario","contraseña");