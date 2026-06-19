
import express from "express";

import httpError from "./middleware/HttpError.js"
import connectDB from "./config/DB.js";

import { error } from "node:console";

import StudentRoutes from "./routes/StudentRoutes.js" 

const app = express();

app.use(express.json());

app.use("/student", StudentRoutes)

app.get("/", (req, res) => {
    res.status(200).json("hello from server");
});

app.use((req, res, next) => {
    return next(new httpError("request route not found", 404))
})

app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error)
    }
    res.status(error.statusCode || 500).json({
        message: error.message || "something want wrong please try again"
    })
})

const port = 5000;

async function startServer() {

    try {

        const connect = await connectDB();

        if (!connect) {
            throw new error("failed to connectDB")
        }

        app.listen(port, (err) => {
            if (err) {
                return console.log(err.message)
            }
            console.log(`server running on port ${port}`)
        })
    }
    catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}
startServer();