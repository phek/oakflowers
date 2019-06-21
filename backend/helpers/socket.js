const io = require('socket.io');

let connection;

const socket = (module.exports = {
  connect: (http) => {
    connection = io(http);

    return connection;
  },
  getConnection: () => connection,
});
