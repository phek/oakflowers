const express = require("express");
const app = (module.exports = express());
const { query, queryOne, post, remove, send403Response } = require("./utils");

app.post("/login", (req, res) => {
  queryOne(
    "Users",
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
            token: "SuperS3cret",
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

app.get("/get/events", (req, res) => {
  query(
    "Events",
    undefined,
    result => {
      if (result) {
        res.send({
          events: result
        });
      } else {
        send403Response(res);
      }
    },
    res
  );
});

app.post("/set/event", (req, res) => {
  if (req.body.token) {
    post(
      "Events",
      {
        title: req.body.event.title,
        start: req.body.event.start,
        end: req.body.event.end
      },
      result => {
        if (result) {
          res.status(200).send();
        } else {
          send403Response(res);
        }
      },
      res
    );
  } else {
    send403Response(res);
  }
});

app.delete("/remove/event", (req, res) => {
  if (req.body.token) {
    remove(
      "Events",
      {
        _id: req.body.event._id
      },
      result => {
        if (result) {
          res.status(200).send();
        } else {
          send403Response(res);
        }
      },
      res
    );
  } else {
    send403Response(res);
  }
});
