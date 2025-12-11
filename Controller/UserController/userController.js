const User = require("../../Schema/UserSchema/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); 

// const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const STATIC_OTP = "101010";

const requestOtp = async (req, res) => {
  try {
    const { mobile } = req.body;

    if (!mobile || !/^[6-9]\d{9}$/.test(mobile)) {
      return res.status(400).json({ 
        success: false, 
        message: "Valid 10-digit mobile number required" 
      });
    }

    let user = await User.findOne({ mobile });
    // const otp = generateOTP();
    const otp = STATIC_OTP; 
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); 

    if (!user) {
      // New user
      user = new User({
        mobile,
        otp,
        otpExpires,
        name: null,
        email: null
      });
      await user.save();
      
      console.log(`✅ New User OTP for ${mobile}: ${otp}`);
      
      return res.json({
        success: true,
        message: "OTP sent! Enter your name & email.",
        registered: false,
        mobile
      });
    }

    // Existing user
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    console.log(`🔑 Existing User OTP for ${mobile}: ${otp}`);

    res.json({
      success: true,
      message: "OTP sent successfully",
      registered: true,
      mobile
    });

  } catch (error) {
    console.error("Request OTP Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
};

// Complete Signup (New User)
const completeSignup = async (req, res) => {
  try {
    const { name, email, mobile, otp } = req.body;

    if (!name || !email || !mobile || !otp) {
      return res.status(400).json({ 
        success: false, 
        message: "All fields required" 
      });
    }

     if (email){
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
          return res.status(400).json({
          success: false,
          message: "Email already in use"
        });
       }
      }

    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // if (user.otp !== otp) {
    if (otp.toString().trim() !== STATIC_OTP) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid OTP" 
      });
    }

    if (user.otpExpires < new Date()) {
      return res.status(400).json({ 
        success: false, 
        message: "OTP expired" 
      });
    }

    // Update user
    user.name = name;
    user.email = email;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET || "your-secret-key", 
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Signup successful",
      token,
      user: { name: user.name, email: user.email, mobile: user.mobile }
    });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
};

// Verify OTP (Existing User Login)
const verifyOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: "User not found" 
      });
    }


    // if (user.otp !== otp) {
    if (otp.toString().trim() !== STATIC_OTP) { 
      return res.status(400).json({ 
        success: false, 
        message: "Invalid OTP" 
      });
    }

    if (user.otpExpires < new Date()) {
      return res.status(400).json({ 
        success: false, 
        message: "OTP expired" 
      });
    }

    // Clear OTP
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET || "your-secret-key", 
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: { name: user.name, email: user.email, mobile: user.mobile }
    });

  } catch (error) {
    console.error("Verify OTP Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
};

module.exports = { requestOtp, completeSignup, verifyOtp };
