const User = require("../models/userModel");

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

    //create new user
    const user = await User.create({
      userName,
      email,
      password,
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
