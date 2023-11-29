const express = require("express");
const router = express.Router();
const { sign_up, login, check_login, logout } = require("../controllers/auth");
const { verifyToken } = require("../../verify/verifyToken");

router.post("/sign_up", sign_up);
router.post("/login", login);
router.get("/check-login", verifyToken, check_login);
router.get("/logout", verifyToken, logout);
module.exports = router;
