const compression = require('compression');
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require('cors')
const app = express();
const port = process.env.PORT || 2053;
const api = require("./api");

app.use(compression());
app.use(cors({credentials: true, origin: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', api);

if (process.env.NODE_ENV === "prod") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
