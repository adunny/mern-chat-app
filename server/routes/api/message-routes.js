const router = require("express").Router();

const {
  getAllMessages,
  createMessage,
  deleteMessage,
} = require("../../controllers/message-controller");

const { authMiddleware } = require("../../utils/auth");

router.route("/").get(getAllMessages).post(authMiddleware, createMessage);

router.route("/:id").delete(authMiddleware, deleteMessage);

module.exports = router;
