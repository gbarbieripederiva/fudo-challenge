import express from "express";
import { getDB } from "./persistence/database";
import AuthRoute from "./routes/authRoute";
import FruitsRoute from "./routes/fruitRoute";

const PORT = 8081;
const app = express();

getDB().catch((e) => {
    console.error("Error initializing database:",e);
});

app.use("/", express.json());

app.use("/api/auth", AuthRoute);
app.use("/api/fruit", FruitsRoute);

app.listen(PORT, () => {
    console.log(`API Running on port ${PORT}...`);
});
