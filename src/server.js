const app = require("./index");
const connect = require("./configs/db");
const port = process.env.PORT || 5000;

app.listen(port, async () => {
  console.log(`Listening on port ${port}`);
  await connect();
});
