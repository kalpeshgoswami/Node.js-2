import express from "express";
import connectDB from "./config/db.js";
import httpError from "./middleware/httpError.js"
import dotenv from "dotenv";
import router from "./router/userRouter.js";

dotenv.config({ path: "./.env" });

const app = express();

app.use(express.json())

app.use("/user", router);

app.get("/", (req, res) => {
    res.json({ message: "hello from server" });
});

app.use((req, res, next) => {
    return next(new httpError("requiest route not found", 404))
});

app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error)
    }
    res.status(error.statusCode || 500).json({ message: error.message || "internal server error" })
})

const port = 5000;

async function startServer() {

    try {
        const connect = await connectDB();

        if (!connect) {
            throw next(new httpError("failed to connect DB", 500))
        }
        app.listen(port, (err) => {
            if (err) {
                return console.log(err.message)
            }
            console.log(`server running port on ${port}`)
        });
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}

startServer()