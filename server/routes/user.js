const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

const {
  createUser,
  getUser,
  login,
  logout,
  getUserById,
  getUserByUsername,
} = require("../controllers/user");

router.post("/signup", createUser);
router.get("/myaccount", authMiddleware, getUser);
router.get("/:userId", getUserById);
router.get("/username/:username", getUserByUsername);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
