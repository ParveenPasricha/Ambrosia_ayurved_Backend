const express = require("express");
const router = express.Router();
const {
  adminRegister,
  adminLogin,
  forgotPassword,
  resetPassword
} = require("../../Controller/AdminController/AdminLoginController");

// Routes
router.post("/register", adminRegister);
router.get("/login", adminLogin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
