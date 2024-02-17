const http = require("http");
const Router = require("./router");
const MiddlewareHandler = require("./middlewareHandler");

class MyExpress {
  constructor() {
    this.router = new Router();
    this.middlewareHandler = new MiddlewareHandler();
    this.server = http.createServer((req, res) => {
      this.middlewareHandler.handle(req, res, () => {
        this.router.handle(req, res);
      });
    });
  }

  use(...args) {
    this.middlewareHandler.use(...args);
  }

  get(path, handler) {
    this.router.get(path, handler);
  }

  listen(port, callback) {
    this.server.listen(port, callback);
  }
}

module.exports = MyExpress;
