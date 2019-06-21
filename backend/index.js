const compression = require('compression');
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require('cors')
const app = express();
const port = process.env.PORT || 80;
const http = require('http').createServer(app);
const api = require("./api");

app.use(compression());
app.use(cors({credentials: true, origin: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', api);

if (process.env.NODE_ENV === "serve") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "./build")));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./build", "index.html"));
  });
}

http.listen(port, () => console.log(`Listening on port ${port}`));
