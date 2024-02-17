const MyExpress = require("./src/myExpress");

const app = new MyExpress();

app.listen(3000, () => {
  console.log("MyExpress server running on http://localhost:3000");
});
