const router = require("express").Router();
const User = require("../../models/User");
const { signToken, authMiddleware } = require("../../utils/auth");
const sendEmail = require("../../utils/sendEmail");

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
router.post("/", async ({ body }, res, next) => {
  try {
    const newUser = await User.create(body);
    const token = signToken(newUser);
    await sendEmail(body);
    res.json({ newUser, token });
  } catch (err) {
    next(err);
  }
});

// login
router.post("/login", async ({ body }, res) => {
  const user = await User.findOne({ username: body.username });
  if (!user) {
    return res
      .status(400)
      .json({ message: "Invalid username/password.", username: false });
  }

  const correctPw = await user.checkPassword(body.password);

  if (!correctPw) {
    return res
      .status(400)
      .json({ message: "Invalid username/password.", password: false });
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
