import { Router } from "express";
import { authenticate } from "./authRoute";
import * as FruitPersistence from "../persistence/fruitPersistence";

const router = Router();

function isValidFruit(fruit: any) {
    // Check if object is a valid fruit by checking all its properties
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
    // Authenticate, if authed return all fruits
    let authed = await authenticate(req.headers.authorization);
    if (!authed.isAuth || !authed.user || !authed.user.id) {
        res.sendStatus(authed.status);
    } else {
        let fruits = await FruitPersistence.getFruitsByUserId(authed.user.id);
        res.status(200).send(fruits);
    }
});
router.post("/", async (req, res) => {
    // Check body is a valid fruit
    if (!isValidFruit(req.body)) {
        res.sendStatus(400);
    }else{
        // Authenticate, if authed create fruit and return it
        let authed = await authenticate(req.headers.authorization);
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
