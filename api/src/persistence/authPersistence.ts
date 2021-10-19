import { User } from "models/user";
import { getDB } from "./database";

export async function getUserByUsername(
    username: string
): Promise<User | null> {
    let db = await getDB();
    let user = await db.get("SELECT id,username,password FROM users WHERE users.username = ?",[username]);
    return user;
}

export async function createUser(user: User) {
    let db = await getDB();
    let resp = await db.run(
        "INSERT INTO users(username, password) VALUES (?,?)",
        [user.username,user.password]
    );
    if (!resp.changes) {
        return null;
    }else{
        return await db.get("SELECT id,username,password FROM users WHERE users.username = ?",[user.username]);
    }
}
