const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const AffiliateUser = require("../models/affiliateUser.model");
const jwt = require("jsonwebtoken");
const env = require("dotenv").config();

// user login
module.exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user with email exists
    const user = await User.findOne({ email });
    if (!user || user.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if password is correct
    /*   const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    } */

    // Generate JWT token
    const token = jwt.sign(email, process.env.token);

    // If email and password are correct, return success message and user information with the token
    res.status(200).json({
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    console.error("Failed login attempt: ", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// user registration
module.exports.registerUser = async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;

    // Check if user with email already exists
    const userExists = await User.where({ email });
    if (userExists.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate a salt to use for password encryption with bcrypt
    const salt = await bcrypt.genSalt(10);

    // Encrypt the user's password with bcrypt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user and save to the database
    const newUser = await User.create({
      email,
      password: hashedPassword,
      fullName,
      roll: "user",
    });

    // Generate JWT token
    const token = jwt.sign(email, process.env.token);

    return res.status(200).json({
      message: "User registration successful!",
      data: newUser,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update user
module.exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, password, fullName, roll } = req.body;

    const data = await User.updateOne(
      { _id: id }, // Corrected: use _id instead of id
      {
        $set: {
          email,
          password,
          fullName,
          roll,
        },
      }
    );

    res.status(200).json({ message: "User update successful!", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete user
module.exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await User.deleteOne({ _id: id });

    res.status(200).json({ message: "User delete successful!", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// affiliate user get
module.exports.affiliateUserGet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { paymentEmail, number, address, email } = req.body;

    const data = await AffiliateUser.where({ _id: id });

    if (data.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User data successful! get", data });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// affiliate user create
module.exports.affiliateUserCreate = async (req, res, next) => {
  try {
    const { paymentEmail, number, address, email } = req.body;

    const data = AffiliateUser.where({ paymentEmail });

    if (data.length > 0) {
      return res.status(400).json({ message: "user already exists" });
    }

    const newData = await AffiliateUser.create({
      paymentEmail,
      number,
      address,
      email,
    });

    res
      .status(200)
      .json({ message: "User registration successful!", data: newData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// affiliate user update
module.exports.affiliateUpdateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { paymentEmail, number, address, email } = req.body;

    // Check if user with email already exists
    const userExists = await AffiliateUser.where({ paymentEmail });
    if (userExists.length === 0) {
      return res.status(400).json({ message: "User not exists" });
    }

    const data = await AffiliateUser.updateOne(
      { _id: id },
      {
        $set: {
          paymentEmail,
          number,
          address,
          email,
        },
      }
    );

    res.status(200).json({ message: "User update successful!", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// affiliate user delete
module.exports.affiliateDeleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // user check
    const userExists = await AffiliateUser.where({ _id: id });

    if (userExists.length === 0) {
      return res.status(400).json({ message: "User not exists" });
    }

    const data = await AffiliateUser.deleteOne({ _id: id });

    res.status(200).json({ message: "User delete successful!", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
