const http = require("http");

class MyExpress {
  constructor() {
    this.server = http.createServer((req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Hello from MyExpress\n");
    });
  }

  listen(port, callback) {
    this.server.listen(port, callback);
  }
}

module.exports = MyExpress;
