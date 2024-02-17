const http = require("http");

class MyExpress {
  constructor() {
    this.routes = [];
    console.log("routes", this.routes);
    this.server = http.createServer((req, res) => {
      const matchingRoute = this.routes.find(
        (route) =>
          route.path === req.url && route.method === req.method.toLowerCase()
      );

      if (matchingRoute) {
        matchingRoute.handler(req, res);
      } else {
        res.writeHead(404);
        res.end("Not Found");
      }
    });
  }

  get(path, handler) {
    this.routes.push({ path, method: "get", handler });
    console.log("routes", this.routes);
  }

  listen(port, callback) {
    this.server.listen(port, callback);
  }
}

module.exports = MyExpress;
