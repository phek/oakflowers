const MongoClient = require("mongodb").MongoClient;
const authSettings = require("./auth");
const jwt = require("jsonwebtoken");
const dbUrl = `mongodb+srv://${authSettings.username}:${
  authSettings.password
}@${authSettings.cluster}`;
const dbName = "oakflowers";

function result(res, callback) {
  return (error, result) => {
    if (error) send500Response(res, error);
    else if (!result) send403Response(res);
    else res.status(200).send(callback ? callback(result) : undefined);
  };
}

function connect(collection, callback, res) {
  MongoClient.connect(dbUrl, { useNewUrlParser: true }, function(
    err,
    database
  ) {
    if (err) {
      send500Response(res, err);
    } else {
      callback(database.db(dbName).collection(collection));
      database.close();
    }
  });
}

function auth(req, res, callback, adminOnly) {
  let token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, authSettings.secret, (err, decoded) => {
      if (err) {
        send403Response(res);
      } else {
        if (adminOnly) {
          if (decoded.role === "admin") {
            callback(decoded);
          } else {
            send403Response(res);
          }
        } else {
          callback(decoded);
        }
      }
    });
  } else {
    send403Response(res);
  }
}

function send403Response(res) {
  res.status(403).send({
    success: false,
    message: "Not authenticated."
  });
}

function send500Response(res, error) {
  console.log(error);
  res.status(500).send({
    success: false,
    message: "Server error."
  });
}

module.exports = {
  auth,
  connect,
  result,
  send403Response
};
