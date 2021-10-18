import express from "express";

const PORT = 8081
const app = express();

app.listen(PORT, ()=>{
    console.log(`API Running on port ${PORT}...`);
})