// Import third party modules

import express from "express";
import dotenv from "dotenv"

// dotenv config
dotenv.config({ path: "./.env" })

// local modules
import HttpError from "./middleware/httpError.js";
import connectDB from "./config/db.js";
import UserRouter from "./router/UserRouter.js";
import AdminRouter from "./router/AdminRouter.js"
import restaurantRouter from "./router/restaurantRouter.js";

const app = express();

app.use(express.json());

app.use("/user", UserRouter);
app.use("/admin", AdminRouter)
app.use("/restaurant",restaurantRouter)


// server check
app.use("/", (req, res) => {
    res.json({ message: "hello from server" })
});

// if route not found
app.use((req, res, next) => {
    return next(new HttpError("requested route not found", 404))
})

//  centralize error handling
app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(new HttpError(error.message))
    }

    res.status(error.statusCode || 500).json({ message: error.message || "internal server error" })
})

const port = 5000;

async function startServer() {

    try {

        const connect = await connectDB()

        if (!connect) {
            return next(new HttpError("failed to connect DB"))
        }

        app.listen(port, (err) => {
            if (err) {
                return console.log(err.message)
            }
            console.log(`server running port on ${port}`)
        })


    } catch (error) {

        console.log(error.message);
        process.exit(1)
    }
}
startServer()