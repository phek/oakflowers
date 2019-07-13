const express = require("express");
const app = (module.exports = express());
const MongoClient = require("mongodb").MongoClient;
const authSettings = require("./auth");
const jwt = require("jsonwebtoken");
const dbName = "oakflowers";
const url = `mongodb+srv://${authSettings.username}:${authSettings.password}@${
  authSettings.cluster
}`;
const socket = require("../helpers/socket");
const {
  isAuthenticated,
  send403Response,
  send500Response
} = require("./utils");
const ObjectID = require("mongodb").ObjectID;

app.post("/login", (req, res) => {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) {
      send500Response(res, err);
    } else {
      const collection = client.db(dbName).collection("Users");
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
            client.close();
          }
        }
      );
    }
  });
});

app.get("/get/events", (req, res) => {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) {
      send500Response(res, err);
    } else {
      const collection = client.db(dbName).collection("Events");
      collection.find().toArray((err, result) => {
        if (err) {
          send500Response(res);
        } else {
          res.status(200).send({ events: result });
        }
        client.close();
      });
    }
  });
});

app.post("/set/event", (req, res) => {
  if (isAuthenticated(req)) {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
      if (err) {
        send500Response(res, err);
      } else {
        const collection = client.db(dbName).collection("Events");
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
            client.close();
          }
        );
      }
    });
  } else {
    send403Response(res);
  }
});

app.delete("/remove/event", (req, res) => {
  if (isAuthenticated(req)) {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
      if (err) {
        send500Response(res, err);
      } else {
        const collection = client.db(dbName).collection("Events");
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
            client.close();
          }
        );
      }
    });
  } else {
    send403Response(res);
  }
});

function newEventsLoaded() {
  const io = socket.getConnection();
  if (io) {
    io.emit("newEvents");
  }
}
