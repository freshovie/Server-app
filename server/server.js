// function sayHello(name) {
//     console.log ('Hello' + name);
// }

// // sayHello('Boss');
// console.log(window)

// const http = require("http");

// const server = http.createServer((req, res) => {
//   if (req.url === "/") {
//     res.write("Welcome to backend development");
//     res.end();
//   }
// });

// server.listen(3000);

// console.log("Listening on port 3000...");

const http = require("http");
const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.write("Hello World");
        res.end();
    }
    if (req.url === "/api/courses") {
        res.write(JSON.stringify({id: 1, name: 'Boss', email: 'cyccoded@gmail.com', phone: '08104129540' }));
        res.end();
    }
})
