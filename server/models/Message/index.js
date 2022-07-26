const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  messageText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: [180, "Max character limit: 180"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
});

const Message = model("Message", messageSchema);

module.exports = Message;
