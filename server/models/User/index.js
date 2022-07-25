const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please enter a username."],
    unique: true,
    trim: true,
    minlength: [5, "Your username must be at least 5 characters long."],
    maxLength: [16, "Your username is too long."],
  },
  email: {
    type: String,
    required: [true, "Please enter an email."],
    unique: true,
    match: [
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      "Must be a valid email address.",
    ],
  },
  password: {
    type: String,
    required: [true, "Please enter a password."],
    minLength: [5, "Your password must be at least 5 characters long."],
  },
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.checkPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
