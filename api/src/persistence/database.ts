import sqlite3 from "sqlite3";
import {Database, open} from "sqlite";
import fs from "fs";
import path from "path";

const dbScriptsFolder = path.join(__dirname,"databaseStartingScripts");
const databaseFolder = path.join(__dirname,"..","data");
const databaseFilename = "database.db";

let db:Database<sqlite3.Database, sqlite3.Statement>|null = null;
sqlite3.verbose()


export async function getDB() {
    // If db is not initialized initialize it
    if (db == null) {
        // Create folder if not exists, open it and initialize database
        fs.mkdirSync(databaseFolder,{recursive:true})
        db = await open({
            filename:path.join(databaseFolder,databaseFilename),
            driver: sqlite3.Database
        });
        for (const file of fs.readdirSync(dbScriptsFolder).sort()) {
            if (file.match(/.*\.sql$/)) {
                await db.exec(fs.readFileSync(path.join(dbScriptsFolder,file)).toString());
            }
        };
    }
    return db;
} 