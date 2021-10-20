import { Fruit } from "models/fruit";
import { getDB } from "./database";

export async function getFruitsByUserId(id: number) {
    let db = await getDB();
    let fruits = await db.all("SELECT * FROM fruits WHERE fruits.userid = ?;", [
        id,
    ]);
    return fruits;
}

export async function createFruitByUserId(id: number, fruit: Fruit) {
    let db = await getDB();
    let res = await db.run(
        "INSERT INTO fruits(userid,name,color,colorName) VALUES(?,?,?,?);",
        [id, fruit.name, fruit.color, fruit.colorName]
    );
    if (res.changes && res.changes > 0) {
        let fruit = await db.get("SELECT * FROM fruits WHERE fruits.id = ?",[res.lastID]);
        return fruit;
    }else{
        return null;
    }
}
