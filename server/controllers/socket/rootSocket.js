const { checkUserArray } = require("../../utils/checkUserArray");
const onlineUsers = [];
const rootSocket = (io) => {
  io.on("connection", (socket) => {
    socket.emit("online_users", onlineUsers);
    socket.join("public_chat");
    console.log(onlineUsers);

    socket.on("user_connected", (user) => {
      socket.currentUser = user;
      console.log(socket.currentUser);
      const userExists = checkUserArray(user, onlineUsers);
      if (!userExists) {
        onlineUsers.push({ user, id: socket.id });
      }
      socket.in("public_chat").emit("online_users", onlineUsers);
      socket.emit("online_users", onlineUsers);
      console.log(`${user} is now online.`);
    });

    socket.on("disconnect", () => {
      // if user closes browser/tab remove from online user list
      const userExists = checkUserArray(socket.currentUser, onlineUsers);
      if (userExists) {
        onlineUsers.splice(
          onlineUsers.findIndex((x) => x.user == socket.currentUser),
          1
        );
      }
      socket.emit("online_users", onlineUsers);
      socket.in("public_chat").emit("online_users", onlineUsers);
    });

    socket.on("logout", (user) => {
      // if user logs out remove them from online users
      const userExists = checkUserArray(user, onlineUsers);
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
