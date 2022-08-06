const { checkUserArray } = require("../../utils/checkUserArray");
const onlineUsers = [];
const rootSocket = (io) => {
  io.on("connection", (socket) => {
    socket.emit("online_users", onlineUsers);
    socket.join("public_chat");
    console.log(onlineUsers);

    socket.on("user_connected", (user) => {
      const userExists = checkUserArray(user, onlineUsers);
      if (!userExists) {
        onlineUsers.push({ user, id: socket.id });
      }
      socket.in("public_chat").emit("online_users", onlineUsers);
      socket.emit("online_users", onlineUsers);
      console.log(`${user} is now online.`);
    });

    socket.on("user_disconnected", (user) => {
      const userExists = checkUserArray(user, onlineUsers);
      // finds the user that disconnected and removes them from the array
      if (userExists) {
        onlineUsers.splice(
          onlineUsers.findIndex((x) => x.user == user),
          1
        );
      }
      socket.emit("online_users", onlineUsers);
      socket.in("public_chat").emit("online_users", onlineUsers);
      console.log(`${user} is now offline.`);
    });

    socket.on("new_message", (message) => {
      socket.in("public_chat").emit("received_message", message);
    });
  });
};

module.exports = rootSocket;
