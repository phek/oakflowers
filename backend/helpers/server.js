const socket = require("./socket");
const database = require("./database");

const port = process.env.PORT || 80;

module.exports = {
  start: http => {
    socket.connect(http);

    database.connect(() => {
      http.listen(port, () => console.log(`Listening on port ${port}`));
    });
  }
};
