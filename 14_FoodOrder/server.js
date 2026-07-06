import express from "express";

const app = express()

app.use("/", (req, res) => {
    res.json({ message: "hello from server" })
})

const port = 5000;

app.listen(port, (err) => {
    if (err) {
        return console.log(err.message)
    }
    console.log(`server running port on ${port}`)
})
