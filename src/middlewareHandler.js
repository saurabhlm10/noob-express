class MiddlewareHandler {
  constructor() {
    this.middlewares = [];
  }

  use(path, handler) {
    if (typeof path === "function") {
      handler = path;
      path = "/";
    }
    this.middlewares.push({ path, handler });
  }

  handle(req, res, next) {
    const matchedMiddlewares = this.middlewares.filter((mw) =>
      req.url.startsWith(mw.path)
    );

    const executeMiddlewares = (index) => {
      if (index < matchedMiddlewares.length) {
        const middleware = matchedMiddlewares[index];
        middleware.handler(req, res, () => executeMiddlewares(index + 1));
        console.log(index);
      } else {
        next();
      }
    };

    executeMiddlewares(0);
  }
}

module.exports = MiddlewareHandler;
