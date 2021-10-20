import { Router } from "express";
import { authenticate } from "./authRoute";
import * as FruitPersistence from "../persistence/fruitPersistence";

const router = Router();

router.get("/", async (req, res) => {
    let authed = await authenticate(req.headers.authorization);
    // TODO: Check condition
    if (!authed.isAuth || !authed.user || !authed.user.id) {
        res.sendStatus(authed.status);
    }else{
        let fruits = await FruitPersistence.getFruitsByUserId(authed.user.id);
        res.status(200).send(fruits);
    }
});

export default router;
