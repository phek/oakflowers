const MongoClient = require("mongodb").MongoClient;
const dbInfo = require("./auth");
const dbUrl = `mongodb+srv://${dbInfo.username}:${dbInfo.password}@${
  dbInfo.cluster
}`;

function queryOne(collection, query, callback, res) {
  MongoClient.connect(dbUrl, { useNewUrlParser: true }, function(err, db) {
    if (err) {
      send500Response(res, err);
    } else {
      const dbo = db.db("oakflowers");
      dbo.collection(collection).findOne(query, (err, result) => {
        if (err) send500Response(res, err);
        else {
          callback(result);
        }
      });
    }
    db.close();
  });
}

function query(collection, query, callback, res) {
  MongoClient.connect(dbUrl, { useNewUrlParser: true }, function(err, db) {
    if (err) {
      send500Response(res, err);
    } else {
      const dbo = db.db("oakflowers");
      dbo
        .collection(collection)
        .find(query)
        .toArray((err, result) => {
          if (err) send500Response(res, err);
          else callback(result);
        });
    }
    db.close();
  });
}

function post(collection, data, callback, res) {
  MongoClient.connect(dbUrl, { useNewUrlParser: true }, function(err, db) {
    if (err) {
      send500Response(res, err);
    } else {
      const dbo = db.db("oakflowers");
      dbo
        .collection(collection)
        .insert(data, (err, result) => {
          if (err) send500Response(res, err);
          else callback(result);
        });
    }
    db.close();
  });
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
  queryOne,
  query,
  post,
  send403Response,
  send500Response
};
