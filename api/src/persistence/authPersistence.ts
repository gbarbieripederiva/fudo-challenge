import { User } from "models/user";
import { getDB } from "./database";

export async function getUserByUsername(
    username: string
): Promise<User | null> {
    // Get db then get user
    let db = await getDB();
    let user = await db.get("SELECT id,username,password FROM users WHERE users.username = ?",[username]);
    return user;
}
