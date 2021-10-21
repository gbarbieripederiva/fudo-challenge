import { Router } from "express";
import * as AuthPersistence from "../persistence/authPersistence";

const router = Router();

router.post("/login", async (req, res) => {
    const UNAUTHORIZED_HEADER = { "WWW-Authenticate": 'Basic realm="fruits"' };

    if (req.body.username && req.body.password) {
        // TODO: Could add sha256 hashing with crypto
        let user = await AuthPersistence.getUserByUsername(req.body.username)
        if (user && user.password == req.body.password) {
            // If it got up to here then its authorized 
            res.status(200).send(user);
        }else{
            // anything wrong here is an unauthorized
            res.header(UNAUTHORIZED_HEADER).sendStatus(401);
        }
    } else {
        res.sendStatus(400);
    }
});

export async function authenticate(authheader:string|undefined) {
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
            
            // TODO: Could add sha256 hashing with crypto
            // Check username and password are present and are correct
            if (
                usernameAndPassword && usernameAndPassword.length == 2 ) {
                let user = await AuthPersistence.getUserByUsername(usernameAndPassword[0]);
                if (user && user.password == usernameAndPassword[1]) {
                    // If it got up to here then its authorized
                    return {isAuth:true,status:200,user:user};
                } else {
                    // anything wrong here is an unauthorized
                    return {isAuth:false,status:401,user:null};
                }
            } else {
                // anything wrong here is an unauthorized
                return {isAuth:false,status:401,user:null};
            }
        } else {
            // If tag not basic or missing username:password then its 
            return {isAuth:false,status:400,user:null};
        }
    } else {
        // If authorazation header not present its a 
        return {isAuth:false,status:400,user:null};
    }
}

export default router;
