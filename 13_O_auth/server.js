import express from "express";
import httpError from "./middleware/httpError.js"
import connectDB from "./config/DB.js";
import router from "./Router/router.js";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";

dotenv.config({ path: "./.env" })

const app = express()

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 90 * 100
    }
}))

app.use(passport.initialize());
app.use(passport.session())
app.set("view engine", "ejs")
app.use(express.json());
app.use("/auth", router);
app.set("view engine", "ejs")

app.get("/", (req, res, next) => {
    res.render("home");
})

app.use((req, res, next) => {
    return next(new httpError("Requested routs not found", 404))
})

app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error"
    });
});

const port = process.env.PORT || 5000;

async function startServer() {

    try {

        const connect = await connectDB();

        if (!connect) {


            throw new Error("Failed to connect DB");
        }

        app.listen(port, (err) => {
            if (err) {
                return console.log(err.message);
            }
            console.log(`server running port on ${port}`)
        })

    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}
startServer()