const express = require("express");
const app = (module.exports = express());
const { queryOne, send403Response } = require("./utils");

app.post("/login", (req, res) => {
  queryOne(
    {
      email: req.body.email,
      password: req.body.password
    },
    result => {
      if (result) {
        res.send({
          user: {
            firstname: result.firstname,
            lastname: result.lastname,
            email: result.email,
            token: 'SuperS3cret',
            role: result.role
          }
        });
      } else {
        send403Response(res);
      }
    },
    res
  );
});

const today = new Date();
const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

let events = [
  {
    id: "test",
    start: today,
    end: tomorrow,
    title: "Test event"
  }
];

app.get("/get/events", (req, res) => {
  res.send({ events });
});

app.post("/set/event", (req, res) => {
  if (req.body.token) {
    events.push(req.body.event);
    res.send({ events });
  } else {
    send403Response(res);
  }
});
