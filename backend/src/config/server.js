const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const connectToDatabase = require("./dbConnection");
const createDefaultPassword = require("../middlewares/createDefaultPassword");

function createApp() {
  const app = express();

  connectToDatabase();

  const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", require("../routes/routes"));

  app.listen(process.env.API_PORT, () => {
    console.log("Server running with success!");
    console.log(
      `API url: ${process.env.API_DOMAIN}:${process.env.API_PORT}/api`
    );
  });

  createDefaultPassword();

  return app;
}

module.exports = createApp;
