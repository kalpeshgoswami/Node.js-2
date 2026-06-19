import http from "http"

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.writeHead(200, { "content-type": "text/html" });
        res.end(`
            <h2>this is first page</h2>
            `
        )
    } else if (req.url === "/first") {
        res.writeHead(200, { "content-type": "text/html" });

        res.end(`<h2>this is second page</h2>`
        )
    }
})

const port = 2000;

server.listen(port, (err) => {
    if (err) {
        console.log(err.message)
        return;
    }
    console.log("server is Started")
})