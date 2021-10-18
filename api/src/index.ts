import express from "express";
import { getDB } from "./persistence/database";
import AuthRoute from "./routes/authRoute";

const PORT = 8081;
const app = express();

getDB().catch((e) => {
    console.error("Error initializing database");
});

app.use("/", express.json());

app.use("/auth", AuthRoute);

app.listen(PORT, () => {
    console.log(`API Running on port ${PORT}...`);
});
