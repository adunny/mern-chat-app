const jwt = require("jsonwebtoken");

const secret = "testsecret";
const expiration = "2h";

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
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch {
    console.log("Invalid Token");
    return res.status(400).json({ message: "Invalid token" });
  }

  next();
};

const signToken = ({ username, email, _id }) => {
  const payload = { username, email, _id };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

module.exports = { authMiddleware, signToken };
