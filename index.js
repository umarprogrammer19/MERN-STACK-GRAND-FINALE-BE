import express from "express";
import "dotenv/config";
import connectdb from "./src/database/index.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

connectdb()
    .then(() => {
        app.listen(port, () => {
            console.log(`🌐✨ Server is up and running smoothly on port ${port}! 🚀🔥`);
        })
    })
    .catch((error) => {
        console.log(error.message);
    })