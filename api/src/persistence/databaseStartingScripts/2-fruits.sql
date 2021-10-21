CREATE TABLE IF NOT EXISTS fruits(
    id INTEGER PRIMARY KEY,
    userid INTEGER NOT NULL,
    name TEXT NOT NULL,
    color TEXT NOT NULL,
    colorName TEXT NOT NULL,
    FOREIGN KEY(userid) REFERENCES users ON DELETE CASCADE
);
-- Default fruits
INSERT OR IGNORE INTO fruits (id,userid,name,color,colorName) VALUES (1,1,"Manzana","ff0000","Rojo");
INSERT OR IGNORE INTO fruits (id,userid,name,color,colorName) VALUES (2,1,"Banana","ffe135","Amarillo");
INSERT OR IGNORE INTO fruits (id,userid,name,color,colorName) VALUES (3,1,"Pera","D1E231","Verde claro");
