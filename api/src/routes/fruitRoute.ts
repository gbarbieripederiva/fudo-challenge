import { Router } from "express";
import { authenticate } from "./authRoute";
import * as FruitPersistence from "../persistence/fruitPersistence";

const router = Router();

function isValidFruit(fruit: any) {
    if (
        fruit &&
        typeof fruit.name === "string" &&
        typeof fruit.color === "string" &&
        /^[0-9a-fA-F]{6}$/.test(fruit.color) &&
        typeof fruit.colorName === "string"
    ) {
        return true;
    }else{
        return false;
    }
}

router.get("/", async (req, res) => {
    let authed = await authenticate(req.headers.authorization);
    // TODO: Check condition
    if (!authed.isAuth || !authed.user || !authed.user.id) {
        res.sendStatus(authed.status);
    } else {
        let fruits = await FruitPersistence.getFruitsByUserId(authed.user.id);
        res.status(200).send(fruits);
    }
});
router.post("/", async (req, res) => {
    if (!isValidFruit(req.body)) {
        res.sendStatus(400);
    }else{
        let authed = await authenticate(req.headers.authorization);
        // TODO: Check condition
        if (!authed.isAuth || !authed.user || !authed.user.id) {
            res.sendStatus(authed.status);
        } else {
            let fruit = await FruitPersistence.createFruitByUserId(
                authed.user.id,
                req.body
            );
            res.status(201).send(fruit);
        }
    }
});

export default router;
