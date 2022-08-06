const { User, Message } = require("../../models");

//TODO: better error handling/validation on most routes

module.exports = {
  async getAllMessages(req, res) {
    const messages = await Message.find();
    res.json(messages);
  },

  async createMessage({ user, body }, res) {
    if (!body.messageText) {
      res.status(400).json({ message: "Cannot send an empty message" });
      return;
    }
    const newMessage = await Message.create({
      username: user.username,
      messageText: body.messageText,
    });

    await User.findOneAndUpdate(
      { username: user.username },
      { $addToSet: { messages: newMessage._id } },
      { new: true }
    );

    res.json(newMessage);
  },

  async deleteMessage({ params, user }, res) {
    try {
      const message = await Message.findByIdAndDelete(params.id);

      const updatedUser = await User.findOneAndUpdate(
        { username: user.username },
        { $pull: { messages: params.id } }
      );

      if (!message || !updatedUser) {
        res.status(400).json({ message: "No message found with that ID" });
        return;
      }

      res.json({ message: "Message deleted." });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Something went wrong..." });
    }
  },
};
