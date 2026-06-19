import express from "express";

const app = express();

app.get("/",(req,res)=>{
    res.send("this is home page");

});

const port = 5000;

app.listen(port,()=>{
    console.log(`running code ${port}`);

});

