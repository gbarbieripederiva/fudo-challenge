import { getDB } from "./database";

export async function getFruitsByUserId(id:number) {
    let db = await getDB();
    let fruits = await db.all("SELECT * FROM fruits WHERE fruits.userid = ?;",[id]);
    return fruits
}
