const MongoClient = require("mongodb").MongoClient;
const authSettings = require("../api/auth");

const dbName = "oakflowers";
const url = `mongodb+srv://${authSettings.username}:${authSettings.password}@${
  authSettings.cluster
}`;

let db;

module.exports = {
  connect: (onSuccess) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
      if (err) {
        console.log(err);
      } else {
        db = client.db(dbName);
        onSuccess();
      }
    });
  },
  getDatabase: () => db,
};
