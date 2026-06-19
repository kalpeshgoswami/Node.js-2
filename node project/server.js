
import express from "express";

import httpError from "./middleware/httpError.js"
import connectDB from "./config/DB.js"
import router from "./route/route.js"

const app = express();

app.use(express.json());

app.use("/student", router)

app.use("/", (req, res, next) => {
    res.status(200).json("hello from server")
});

app.use((req, res, next) => {
    return next(new httpError("request route not found", 404));
})

app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(new httpError(error.message));
    }
    res.status(error.code || 500).json({
        message: error.message || "internal server error"
    });
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
            console.log(`server running on port ${port}`)
        })


    } catch (error) {

        console.log(error.message);
        process.exit(1)
    }
}
startServer();