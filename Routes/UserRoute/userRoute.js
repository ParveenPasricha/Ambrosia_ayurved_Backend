const router = require("express").Router();
const { requestOtp, verifyOtp, completeSignup } = require("../../Controller/UserController/userController");
const productRoutes = require('../AdminRoute/productRoute');

router.post("/request-otp", requestOtp);      
router.post("/verify-otp", verifyOtp);         
router.post("/complete-signup", completeSignup); 
router.use('/products', productRoutes);
module.exports = router;
