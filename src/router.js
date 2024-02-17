class Router {
  constructor() {
    this.routes = [];
  }

  get(path, handler) {
    const route = {
      path: this.parsePath(path),
      handler,
      keys: [],
    };

    route.path = path.replace(/:([^\/]+)/g, (match, key) => {
      route.keys.push(key);
      return "([^\\/]+)";
    });

    route.regex = new RegExp(`^${route.path}$`);

    console.log(route.regex);
    this.routes.push(route);
  }

  handle(req, res) {
    const { pathname } = new URL(req.url, `http://${req.headers.host}`);
    for (const route of this.routes) {
      const match = pathname.match(route.regex);
      console.log("match", match);
      if (match && req.method.toLowerCase() === "get") {
        const params = this.extractParams(route, match);
        req.params = params;
        route.handler(req, res);
        return;
      }
    }
    res.writeHead(404);
    res.end("Not Found");
  }

  parsePath(path) {
    return path.replace(/:([^\/]+)/g, "([^\\/]+)");
  }

  extractParams(route, match) {
    const params = {};
    route.keys.forEach((key, index) => {
      params[key] = match[index + 1];
    });

    console.log(params);
    return params;
  }
}

module.exports = Router;
