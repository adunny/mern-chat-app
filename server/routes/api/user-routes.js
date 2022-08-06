const router = require("express").Router();
const {
  getOneUser,
  createUser,
  login,
  deleteUser,
} = require("../../controllers/api/user-controller");

const { authMiddleware } = require("../../utils/auth");

router.route("/").post(createUser).delete(authMiddleware, deleteUser);

router.route("/:id").get(getOneUser);

router.route("/login").post(login);

module.exports = router;
