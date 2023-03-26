const {notFound} = require("./middlewares");
const routes = require("./Routes");

const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Home",
  });
});

app.use("/api", routes);

function start(port) {
  app.listen(port, () => {
    console.log(`Server is Listening: http://localhost:${port}`);
  });
}

app.use(notFound);

module.exports = {
  app,
  start,
};
