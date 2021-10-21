CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE NOT NULL ,
    password TEXT NOT NULL
);
-- Default user
INSERT OR IGNORE INTO users (id,username,password) VALUES (1,"usuario","contraseña");