
import express from "express";
import httpError from "./middleware/httpError.js";
import connectDB from "./config/DB.js";
import dotenv from "dotenv"
import router from "./router/router.js";

dotenv.config({ path: "./.env" })

const app = express()

app.use(express.json())

app.use("/package", router)

app.get("/", (req, res, next) => {
    res.send("hello world")
});

app.get((req, res, next) => {
    res.status(404).json("route is not found")
})

app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error)
    }

    console.log("ERROR:", error);

    res.status(error.statusCode || 500)
        .json({ message: error.message || "internal server error" })
})

const port = 5000;

async function startServer() {
    try {
        const connect = await connectDB();

        if (!connect) {
            console.log("failed to connect DB");
            return;
        }

        app.listen(port, (err) => {

            if(err){
                return console.log(err.message)
            }
            
            console.log(`server running on port ${port}`);
        });

    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

startServer();


