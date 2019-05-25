const express = require("express");
const app = (module.exports = express());
const { connect, result, send403Response } = require("./utils");
const ObjectID = require("mongodb").ObjectID;

app.post("/login", (req, res) => {
  const handleResult = result(res, result => ({
    user: {
      firstname: result.firstname,
      lastname: result.lastname,
      email: result.email,
      token: "SuperS3cret",
      role: result.role
    }
  }));
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
  if (req.body.token) {
    const handleResult = result(res, result => ({
      eventId: result.insertedId
    }));
    connect(
      "Events",
      db =>
        db.insertOne(
          {
            user: req.body.event.user,
            title: req.body.event.title,
            start: req.body.event.start,
            end: req.body.event.end
          },
          handleResult
        ),
      res
    );
  } else {
    send403Response(res);
  }
});

app.delete("/remove/event", (req, res) => {
  if (req.body.token) {
    const handleResult = result(res);
    console.log("Deleting", ObjectID(req.body.event._id));
    connect(
      "Events",
      db =>
        db.deleteOne(
          {
            _id: ObjectID(req.body.event._id)
          },
          handleResult
        ),
      res
    );
  } else {
    send403Response(res);
  }
});
