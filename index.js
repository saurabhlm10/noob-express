const MyExpress = require("./src/myExpress");

const app = new MyExpress();

app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Home Page");
});

app.get("/about", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("About Page");
});

app.listen(3000, () => {
  console.log("MyExpress server running on http://localhost:3000");
});
