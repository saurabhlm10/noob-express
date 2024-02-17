class Router {
  constructor() {
    this.routes = [];
  }

  get(path, handler) {
    this.routes.push({ path, method: "get", handler });
  }

  handle(req, res) {
    const route = this.routes.find(
      (route) =>
        route.path === req.url && route.method === req.method.toLowerCase()
    );

    if (route) {
      route.handler(req, res);
    } else {
      res.writeHead(404);
      res.end("Not Found");
    }
  }
}

module.exports = Router;
