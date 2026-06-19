import http from "http";

const server = http.createServer((req, res) => {
    res.writeHead(200, { "content-type": "text/html" });
    res.end("<h1>this is custom server</h1>")
});

const port = 8080;

server.listen(port, (err) => {
    if (err) {
        console.log(err.message)
        return;
    }
    console.log("server is started")

});