import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express, { urlencoded } from "express";
import connectdb from "./src/database/index.js";
import clientRouter from "./src/routes/client.routes.js"
import loanRouter from "./src/routes/loan.routes.js"
import adminRouter from "./src/routes/admin.routes.js"

const app = express();
const port = process.env.PORT;

const corsOptions = {
    origin: process.env.NODE_ENV !== "production" ? 'http://localhost:3000' : "https://mern-stack-grand-finale-fe.vercel.app",
    credentials: true,
};


app.use(cors(corsOptions));
app.use((urlencoded({ extended: false })));
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1', clientRouter);
app.use('/api/v2', loanRouter);
app.use('/api/admin', adminRouter);

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