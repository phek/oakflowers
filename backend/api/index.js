const express = require("express");
const app = (module.exports = express());
const jwt = require("jsonwebtoken");
const authSettings = require("./auth");
const { connect, result, auth, send403Response } = require("./utils");
const ObjectID = require("mongodb").ObjectID;

app.post("/login", (req, res) => {
  const handleResult = result(res, result => {
    const { firstname, lastname, email, role } = result;
    const token = jwt.sign(
      { firstname, lastname, email, role },
      authSettings.secret
    );
    return {
      user: {
        firstname,
        lastname,
        email,
        token,
        role
      }
    };
  });
  connect(
    "Users",
    db =>
      db.findOne(
        {
          email: req.body.email,
          password: req.body.password
        },
        handleResult
      ),
    res
  );
});

app.get("/get/events", (req, res) => {
  const handleResult = result(res, result => ({ events: result }));
  connect(
    "Events",
    db => db.find().toArray(handleResult),
    res
  );
});

app.post("/set/event", (req, res) => {
  auth(req, res, user => {
    const handleResult = result(res, result => ({
      eventId: result.insertedId,
      userEmail: user.email
    }));
    connect(
      "Events",
      db =>
        db.insertOne(
          {
            user: user.email,
            title: req.body.event.title,
            start: req.body.event.start,
            end: req.body.event.end
          },
          handleResult
        ),
      res
    );
  });
});

app.delete("/remove/event", (req, res) => {
  auth(req, res, user => {
    const handleResult = result(res);
    connect(
      "Events",
      db => {
        return db.deleteOne(
          {
            _id: ObjectID(req.body.event._id),
            user: user.email
          },
          handleResult
        );
      },
      res
    );
  });
});
