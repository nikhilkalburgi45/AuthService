const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config/ServerConfig");

const setUpAndStartServer = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.listen(PORT, () => {
    console.log(`Server is up and runnning on ${PORT}`);
  });
};
setUpAndStartServer();
