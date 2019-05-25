const MongoClient = require("mongodb").MongoClient;
const dbInfo = require("./auth");
const dbUrl = `mongodb+srv://${dbInfo.username}:${dbInfo.password}@${
  dbInfo.cluster
}`;
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
  connect,
  result,
  send403Response
};
