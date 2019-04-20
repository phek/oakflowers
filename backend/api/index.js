const express = require("express");
const app = (module.exports = express());

app.post("/login", (req, res) => {
  res.send({ token: req.body.email });
});

const today = new Date();
const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

let events = [
  {
    id: "test",
    start: today,
    end: tomorrow,
    title: "Some title"
  }
];

app.get("/get/events", (req, res) => {
  if (req.query.token) {
    res.send({ events });
  } else {
    send403Response(res);
  }
});

app.post("/set/event", (req, res) => {
  if (req.body.token) {
    events.push(req.body.event);
    res.send({ events });
  } else {
    send403Response(res);
  }
});

function send403Response(res) {
  res.status(403).send({
    success: false,
    message: "Not authenticated."
  });
}
