const MongoClient = require("mongodb").MongoClient;
const dbInfo = require("./auth");
const dbUrl = `mongodb+srv://${dbInfo.username}:${dbInfo.password}@${
  dbInfo.cluster
}`;
const dbName = "oakflowers";

function queryOne(collection, query, callback, res) {
  connect(database =>
    database.collection(collection).findOne(query, (err, result) => {
      if (err) send500Response(res, err);
      else {
        callback(result);
      }
    })
  );
}

function query(collection, query, callback, res) {
  connect(database =>
    database
      .collection(collection)
      .find(query)
      .toArray((err, result) => {
        if (err) send500Response(res, err);
        else callback(result);
      })
  );
}

function post(collection, data, callback, res) {
  connect(database =>
    database.collection(collection).insert(data, (err, result) => {
      if (err) send500Response(res, err);
      else callback(result);
    })
  );
}

function remove(collection, data, callback, res) {
  connect(database =>
    database.collection(collection).remove(data, (err, result) => {
      if (err) send500Response(res, err);
      else callback(result);
    })
  );
}

function connect(callback) {
  MongoClient.connect(dbUrl, { useNewUrlParser: true }, function(
    err,
    database
  ) {
    if (err) {
      send500Response(res, err);
    } else {
      callback(database.db(dbName));
      database.close();
    }
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
  remove,
  send403Response,
  send500Response
};
