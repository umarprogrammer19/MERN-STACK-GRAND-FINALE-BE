import express, { urlencoded } from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectdb from "./src/database/index.js";
import authRouter from "./src/routes/auth.routes.js"

const app = express();
const port = process.env.PORT;

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};

app.use(cors(corsOptions));
app.use((urlencoded({ extended: false })));
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1', authRouter);

app.get("/", (req, res) => {
    res.send("SMIT GRAND FINALS");
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