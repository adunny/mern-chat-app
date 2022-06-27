const router = require("express").Router();
const User = require("../../models/User");
const { signToken } = require("../../utils/auth");

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

// delete user
router.delete("/:id", async ({ params }, res) => {
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
