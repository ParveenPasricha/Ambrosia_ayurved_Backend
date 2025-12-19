const router = require("express").Router();
const { requestOtp, verifyOtp, completeSignup } = require("../../Controller/UserController/userController");

router.post("/request-otp", requestOtp);      
router.post("/verify-otp", verifyOtp);         
router.post("/complete-signup", completeSignup); 
module.exports = router;
