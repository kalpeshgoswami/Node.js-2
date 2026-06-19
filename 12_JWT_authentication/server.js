import express from "express";

import dotenv from "dotenv"

dotenv.config({ path: "./.env" })

import httpError from "./middleware/httpError.js";
import connectDB from "./config/DB.js";
import router from "./router/userRouter.js"


const app = express();

app.use(express.json())

app.use("/user", router)

app.get("/", (req, res) => {
    res.json({message:"hello from server"})
});

app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(new httpError(error.message))
    }

    res.status(error.status || 500)
        .json({ message: error.message || "intrnal error" })
})


const port = process.env.PORT || 5000;

async function startServer() {
    try {

        const connect = await connectDB();

        if (!connect) {
            return new httpError("failed to connect DB", 404)
        }

        app.listen(port, (err) => {
            if (err) {
                return console.log(err.message);
            }
            console.log(`server running port on ${port}`)
        });

    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

startServer();