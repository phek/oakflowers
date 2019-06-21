const compression = require("compression");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 80;
const http = require("http").createServer(app);
const https = require("express-force-https");
const api = require("./api");
const socket = require("./helpers/socket");

app.use(compression());
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(https);
app.use("/api", api);

if (process.env.NODE_ENV === "serve") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  });
}

const io = socket.connect(http);

io.on("connection", function(socket) {
  console.log("A user connected");

  socket.on("disconnect", function() {
    console.log("User disconnected");
  });
});

http.listen(port, () => console.log(`Listening on port ${port}`));
