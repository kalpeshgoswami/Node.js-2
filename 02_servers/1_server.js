import http from "http";

const server = http.createServer((req, res) =>{
    res.write("hello developer");
    res.end();
});

const port = 4500;

server.listen(port,(err)=>{
    if(err){
        return console.log(err.message);
    }
    console.log(`server is running ${port}`);
});