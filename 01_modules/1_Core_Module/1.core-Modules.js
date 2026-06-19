
const fs = require('fs');

fs.writeFileSync('demo.txt','Hello Module');

const data = fs.readFileSync("new.txt", "utf-8")
console.log("data", data)