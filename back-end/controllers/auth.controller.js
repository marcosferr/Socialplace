const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendToken = require("../utils/jwtToken");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

// Register a new user => /api/v1/register

module.exports.register = catchAsyncErrors(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.create({ username, password, aboutMe: "" });
  sendToken(user, 201, res);
});

// Login a registered user => /api/v1/login

module.exports.login = catchAsyncErrors(async (req, res, next) => {
  const { username, password } = req.body;
  // Check if username and password is entered by user
  if (!username || !password) {
    return next(new ErrorHandler("Please enter username & password", 400));
  }
  // Find user in database
  const user = await User.findOne({ username }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid username or password", 401));
  }
  // Check if password is correct
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid username or password", 401));
  }
  sendToken(user, 200, res);
});

// Logout user => /api/v1/logout

module.exports.logout = catchAsyncErrors(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});
