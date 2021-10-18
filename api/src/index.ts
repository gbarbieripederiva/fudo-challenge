import express from "express";
import AuthRoute from "./routes/authRoute";

const PORT = 8081
const app = express();

app.use("/auth",AuthRoute)

app.listen(PORT, ()=>{
    console.log(`API Running on port ${PORT}...`);
})