import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("this is first page");
});

app.get("/about", (req, res) => {
    res.send("this second page");

});

const port = 5000;

app.listen(port, () => {
    console.log(`start to running ${port}`)
});