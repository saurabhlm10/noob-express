class Router {
  constructor() {
    this.routes = [];
  }

  get(path, handler) {
    const route = {
      path,
      handler,
      keys: [],
      regex: null,
    };
    route.path = path.replace(/:([^\/]+)/g, (match, key) => {
      route.keys.push(key);
      return "([^\\/]+)";
    });

    route.regex = new RegExp(`^${route.path}$`);

    this.routes.push(route);
  }

  handle(req, res) {
    const { pathname } = new URL(req.url, `http://${req.headers.host}`);
    for (const route of this.routes) {
      const match = pathname.match(route.regex);
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

  extractParams(route, match) {
    const params = {};
    route.keys.forEach((key, index) => {
      params[key] = match[index + 1];
    });

    return params;
  }
}

module.exports = Router;
