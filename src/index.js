const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config/ServerConfig");
const apiRoutes = require("./routes/index");

const cors = require("cors");

const setUpAndStartServer = () => {
  const app = express();
  app.use(
    cors({
      origin: "http://localhost:5173", // your Vite frontend URL
      credentials: true, // needed for httpOnly cookies
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  app.listen(PORT, () => {
    console.log(`Server is up and runnning on ${PORT}`);
  });
};
setUpAndStartServer();
