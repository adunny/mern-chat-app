const router = require("express").Router();
const { User, Message } = require("../../models");
const { authMiddleware } = require("../../utils/auth");

// get all messages
router.get("/", async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

// create message
router.post("/", authMiddleware, async ({ body }, res) => {
  const newMessage = await Message.create(body);

  await User.findOneAndUpdate(
    { username: body.username },
    { $addToSet: { messages: newMessage._id } },
    { new: true }
  );

  res.json(newMessage);
});

// delete message
router.delete("/:id", authMiddleware, async ({ params, user }, res) => {
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
});

module.exports = router;
