const io = require("socket.io");

let connection;

module.exports = {
  connect: http => {
    connection = io(http);
  },
  getConnection: () => connection
};
