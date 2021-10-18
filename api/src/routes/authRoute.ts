import { Router } from "express";
import { User } from "../models/user";
import * as AuthService from "../services/authServices";

const router = Router();

router.post("/login", async (req, res) => {
    const UNAUTHORIZED_HEADER = { "WWW-Authenticate": 'Basic realm="fruits"' };

    // Check if authorization header is present
    if (req.headers.authorization) {
        // Check its basic authorization and obtain username and password encoded
        let loginInfo = req.headers.authorization.match(
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
                res.sendStatus(200);
            } else {
                // anything wrong here is an unauthorized
                res.header(UNAUTHORIZED_HEADER).sendStatus(401);
            }
        } else {
            // If tag not basic or missing username:password then its bad request
            res.header(UNAUTHORIZED_HEADER).sendStatus(400);
        }
    } else {
        // If authorazation header not present its a bad request
        res.header(UNAUTHORIZED_HEADER).sendStatus(400);
    }
});

router.post("/user", async (req, res) => {
    let user = req.body as User;
    let userCreated = AuthService.createUser(user);
    if (userCreated) {
        // TODO:check status code
        res.status(200).send(userCreated);
    } else {
        // TODO:check status code
        res.sendStatus(500);
    }
});

export default router;
