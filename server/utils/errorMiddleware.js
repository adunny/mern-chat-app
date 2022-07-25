module.exports = (err, req, res, next) => {
  // duplicate entry handler
  if (err.code && err.code === 11000) {
    // get name of invalid field (username, email, etc)
    const path = Object.keys(err.keyValue);

    res.status(400).send({
      success: false,
      message: [`That ${path} is already in use.`],
      path,
    });
  }

  // invalid entry handler
  else if (err.name === "ValidationError") {
    const errMessages = Object.values(err.errors).map((x) => x.message);
    const path = Object.values(err.errors).map((x) => x.path);

    res.status(400).send({ success: false, message: errMessages, path });
  } else {
    res.status(500).json({
      success: false,
      message: ["Something went wrong..."],
      path: null,
    });
  }
};
