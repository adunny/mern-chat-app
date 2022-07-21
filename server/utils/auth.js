const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  let token = req.headers.authorization;

  // if theres an auth header grab token
  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  try {
    const { data } = jwt.verify(token, process.env.JWT_SECRET, {
      maxAge: process.env.JWT_EXP,
    });
    req.user = data;
  } catch {
    console.log("Invalid Token");
    return res.status(400).json({ message: "Invalid token" });
  }

  next();
};

const signToken = ({ username, email, _id }) => {
  const payload = { username, email, _id };

  return jwt.sign({ data: payload }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });
};

module.exports = { authMiddleware, signToken };
