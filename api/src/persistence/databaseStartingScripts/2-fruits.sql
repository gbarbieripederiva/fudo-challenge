CREATE TABLE IF NOT EXISTS fruits(
    id INTEGER PRIMARY KEY,
    userid INTEGER NOT NULL,
    name TEXT NOT NULL,
    color TEXT NOT NULL,
    colorName TEXT NOT NULL,
    FOREIGN KEY(userid) REFERENCES users ON DELETE CASCADE
);
-- TODO:update
INSERT INTO fruits (userid,name,color,colorName) VALUES (1,"manzana","ffffff","blanco");
