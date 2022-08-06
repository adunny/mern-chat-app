const User = require("../../models/User");
const { signToken } = require("../../utils/auth");
const sendEmail = require("../../utils/sendEmail");

//TODO: better error handling/validation on most routes

module.exports = {
  async getAllUsers(req, res) {
    const allUsers = await User.find().select("-__v -password");

    res.json(allUsers);
  },

  async getOneUser({ params }, res) {
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
  },

  async createUser({ body }, res, next) {
    try {
      const newUser = await User.create(body);
      const token = signToken(newUser);
      await sendEmail(body);
      res.json({ newUser, token });
    } catch (err) {
      next(err);
    }
  },

  async login({ body }, res) {
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
  },

  async deleteUser({ params }, res) {
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
  },
};
