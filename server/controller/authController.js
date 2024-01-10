const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// REGISTER
exports.register = async (req, res) => {
  try {
    const { userName, email, password, phone, address } = req.body;
    // Validation
    if (!userName || !email || !password || !phone || !address) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    //check user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "Email Already Register Please Login",
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
      address,
      phone,
    });
    res.status(201).send({
      success: true,
      message: " Successfully Registered",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

//LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Email and Password",
      });
    }

    //check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    //compare password or check user password
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login API",
      error,
    });
  }
};
