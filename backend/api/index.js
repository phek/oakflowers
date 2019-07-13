const express = require("express");
const app = (module.exports = express());
const authSettings = require("./auth");
const jwt = require("jsonwebtoken");
const { getUser, send403Response, send500Response } = require("./utils");
const ObjectID = require("mongodb").ObjectID;
const socket = require("../helpers/socket");
const database = require("../helpers/database");

app.post("/login", (req, res) => {
  const db = database.getDatabase();
  const collection = db.collection("Users");
  collection.findOne(
    {
      email: req.body.email,
      password: req.body.password
    },
    (err, result) => {
      if (err) {
        send500Response(res);
      } else {
        if (!result) {
          res.status(401).send({
            message: "Fel användarnamn eller lösenord!"
          });
        } else {
          const { firstname, lastname, email, role } = result;
          const token = jwt.sign(
            { firstname, lastname, email, role },
            authSettings.secret
          );
          res.status(200).send({
            user: {
              firstname,
              lastname,
              email,
              token,
              role
            }
          });
        }
      }
    }
  );
});

app.get("/get/events", (req, res) => {
  const db = database.getDatabase();
  const collection = db.collection("Events");
  collection.find().toArray((err, result) => {
    if (err) {
      send500Response(res);
    } else {
      res.status(200).send({ events: result });
    }
  });
});

app.post("/set/event", (req, res) => {
  const user = getUser(req);

  if (user) {
    const db = database.getDatabase();
    const collection = db.collection("Events");
    collection.insertOne(
      {
        user: user.email,
        title: req.body.event.title,
        start: req.body.event.start,
        end: req.body.event.end
      },
      (err, result) => {
        if (err) {
          send500Response(res);
        } else {
          newEventsLoaded();
          res.status(200).send({
            eventId: result.insertedId,
            userEmail: user.email
          });
        }
      }
    );
  } else {
    send403Response(res);
  }
});

app.delete("/remove/event", (req, res) => {
  const user = getUser(req);

  if (user) {
    const db = database.getDatabase();
    const collection = db.collection("Events");
    collection.deleteOne(
      {
        _id: ObjectID(req.body.event._id),
        user: user.email
      },
      (err, result) => {
        if (err) {
          send500Response(res);
        } else {
          newEventsLoaded();
          res.status(200).send();
        }
      }
    );
  } else {
    send403Response(res);
  }
});

function newEventsLoaded() {
  const io = socket.getConnection();
  io.emit("newEvents");
}
