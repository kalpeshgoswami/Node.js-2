import express from "express";
import httpError from "./middleware/httpError.js";
import connectDB from "./config/DB.js";
import dotenv from "dotenv";

import eventRoutes from "./route/eventRouter.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/event", eventRoutes);

app.get("/", (req, res) => {
    res.status(200).json("hello from server");
});

app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    res.status(error.cod || 500).json({
        message: error.message || "internal server error"
    })
})

const port = 5000;

async function startServer() {

    try {
        const connect = await connectDB();

        if (!connect) {
            throw new Error("failed to connect DB")
        } else {
            app.listen(port, (err) => {
                if (err) {
                    return console.log(err.message)
                }
                console.log(`server running port on ${port}`)
            });
        }
    } catch (error) {

        console.log(error.message)
        process.exit(1)

    }
}

startServer();