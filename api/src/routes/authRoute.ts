import { Router } from "express";
import { User } from "../models/user";
import * as AuthService from "../services/authServices";

const router = Router();

router.post("/login", async (req, res) => {
    const UNAUTHORIZED_HEADER = { "WWW-Authenticate": 'Basic realm="fruits"' };

    if (req.body.username && req.body.password) {
        // If it got up to here then its authorized
        if (
            await AuthService.checkUsernameAndPassword(
                req.body.username,
                req.body.password
            )
        ) {
            res.sendStatus(200);
        }else{
            // anything wrong here is an unauthorized
            res.header(UNAUTHORIZED_HEADER).sendStatus(401);
        }
    } else {
        res.sendStatus(400);
    }
});

router.post("/user", async (req, res) => {
    let user = req.body as User;
    let userCreated = await AuthService.createUser(user);
    if (userCreated) {
        res.status(201).send(userCreated);
    } else {
        // TODO:check status code
        res.sendStatus(500);
    }
});

export async function checkAuth(authheader:string) {
    // Check if authorization header is present
    if (authheader) {
        // Check its basic authorization and obtain username and password encoded
        let loginInfo = authheader.match(
            /Basic *([A-Za-z0-9=+/]+)/
        );
        if (loginInfo && loginInfo.length >= 2) {
            // Decode username and password
            let usernameAndPassword = Buffer.from(loginInfo[1], "base64")
                .toString()
                .split(":");
            // Check username and password are present and are correct
            if (
                usernameAndPassword &&
                usernameAndPassword.length == 2 &&
                (await AuthService.checkUsernameAndPassword(
                    usernameAndPassword[0],
                    usernameAndPassword[1]
                ))
            ) {
                // If it got up to here then its authorized
                return {isAuth:true,status:200};
            } else {
                // anything wrong here is an unauthorized
                return {isAuth:false,status:401};
            }
        } else {
            // If tag not basic or missing username:password then its 
            return {isAuth:false,status:400};
        }
    } else {
        // If authorazation header not present its a 
        return {isAuth:false,status:400};
    }
}

export default router;
