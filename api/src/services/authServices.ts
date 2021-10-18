import { User } from "../models/user";
import * as AuthPersistence from "../persistence/authPersistence";

export async function checkUsernameAndPassword(
    username: string,
    password: string
) {
    let user = await AuthPersistence.getUserByUsername(username);
    if (user && user.username == username && user.password == password) {
        return true;
    } else {
        return false;
    }
}

export async function createUser(user: User) {
    return AuthPersistence.createUser(user);
}
