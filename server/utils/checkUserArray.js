// checks if user is already in the onlineUsers array to prevent duplicate online users

module.exports = {
  checkUserArray: (value, arr) => {
    return arr.some((x) => x.user === value);
  },
};
