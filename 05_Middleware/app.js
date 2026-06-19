
import express from "express";
import helmet from "helmet";
import HttpError from "./middleware/HttpError.js";
import checkRole from "./middleware/checkRole.js";


const app = express();


//   1.application level middleware
app.use(express.json());


// 4.external middleware
app.use(helmet());


//  2. routes level

app.get("/", (req, res) => {
    res.send("hello from server");

})

app.get("/about", (req, res) => {
    res.send("About route");

})


app.get("/admit", checkRole, (req, res, next) => {

    res.send("this is admin routes");
    next();
})


//   3. undefined routes handing

app.use((req, res) => {
    res.send("request route not found")
})


// 5.centralize error handling

app.use((error, req, res, next) => {
    if (res.headerSet) {
        return next(error);
    }

    res.status(error.statuscode || 500)
        .json(error.message || "internal server error please try again later");

})




const port = 5000;

app.listen(port, (err) => {
    if (err) {
        return console.log(err.message);
    }

    console.log(`server port ${port}`)
}) 