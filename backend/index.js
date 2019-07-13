const compression = require("compression");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const app = express();
const http = require("http").createServer(app);
const https = require("express-force-https");
const api = require("./api");
const server = require("./helpers/server");

app.use(compression());
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(https);
app.use("/api", api);

if (process.env.NODE_ENV === "serve") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "./build")));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./build", "index.html"));
  });
}

server.start(http, app);