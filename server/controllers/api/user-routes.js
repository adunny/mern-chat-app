const router = require("express").Router();
const User = require("../../models/User");
const { signToken, authMiddleware } = require("../../utils/auth");

//TODO: better error handling/validation on most routes

// get all users
router.get("/", async (req, res) => {
  const allUsers = await User.find().select("-__v -password");

  res.json(allUsers);
});

// get one user
router.get("/:id", async ({ params }, res) => {
  try {
    const user = await User.findById(params.id)
      .select("-__v -password")
      .populate("messages");
    if (!user) {
      res.status(400).json({ message: "Invalid User ID" });
      return;
    }
    res.json(user);
  } catch (e) {
    res.status(500).json(e);
  }
});

// create user
router.post("/", async ({ body }, res) => {
  try {
    const newUser = await User.create(body);
    const token = signToken(newUser);
    res.json({ newUser, token });
  } catch (e) {
    res.status(500).json(e);
  }
});

// login
router.post("/login", async ({ body }, res) => {
  const user = await User.findOne({ username: body.username });
  if (!user) {
    return res.status(400).json({ message: "User not found." });
  }

  const correctPw = await user.checkPassword(body.password);

  if (!correctPw) {
    return res.status(400).json({ message: "Incorrect password." });
  }

  const token = signToken(user);

  res.json({ token, user });
});

// delete user
router.delete("/:id", authMiddleware, async ({ params }, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(params.id);
    if (!deletedUser) {
      res.status(400).json({ message: "No user found with that ID" });
      return;
    }
    res.json({ message: "User deleted." });
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
