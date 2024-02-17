const http = require("http");

class MyExpress {
  constructor() {
    this.routes = [];
    this.middlewares = [];
    this.server = http.createServer((req, res) => {
      const matchedMiddlewares = this.middlewares.filter((mw) =>
        req.url.startsWith(mw.path)
      );
      const route = this.routes.find(
        (route) =>
          route.path === req.url && route.method === req.method.toLowerCase()
      );

      const next = () => {
        if (matchedMiddlewares.length > 0) {
          const middleware = matchedMiddlewares.shift();
          console.log("middleware", middleware);
          middleware.handler(req, res, next);
          console.log("middleware handled", matchedMiddlewares.length);
        } else if (route) {
          route.handler(req, res);
        } else {
          res.writeHead(404);
          res.end("Not Found");
        }
      };
      next();
    });
  }

  use(path, handler) {
    if (typeof path === "function") {
      handler = path;
      path = "/";
    }
    this.middlewares.push({ path, handler });
  }

  get(path, handler) {
    this.routes.push({ path, method: "get", handler });
  }

  listen(port, callback) {
    this.server.listen(port, callback);
  }
}

module.exports = MyExpress;
