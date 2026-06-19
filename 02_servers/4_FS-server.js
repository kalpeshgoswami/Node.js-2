import http from "http";

import fs from "fs";

const server = http.createServer((req,res)=>{
    fs.readFile("./4_index.html",(err,data)=>{
        if(err){
            return res.end("page not found")
        }else{res.end(data)}
    })
})

const port = 5000;

server.listen(port,(err)=>{
    if(err){
        console.log(err.message)
    }

    console.log("server")
})