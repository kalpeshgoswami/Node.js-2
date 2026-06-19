import express from "express";
import dotenv from "dotenv";

import httpError from "./middleware/httpError.js";
import connectDB from "./config/DB.js";
import router from "./Routes/route.js";

dotenv.config({ path: "./.env" });

const app = express();

app.use(express.json());

app.use("/event", router);

app.get("/", (req, res, next) => {
   res.json("hello from server")
});

app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    res.status(error.statusCode || 500).json({
        message: error.message || "internal server error"
    })
});

const port = 5000;

async function startServer() {

    try {
        const connect = await connectDB();

        if (!connect) {
            throw new Error("failed to connect DB")
        }
        app.listen(port, (err) => {
            if (err) {
                return console.log(err.message)
            }
            console.log(`server running port on ${port}`)
        })
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}
startServer();