const User = require("../models/user.model");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");

// Get current profile => /api/v1/me

module.exports.getProfile = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler(401, "Login first to access this resource"));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      return next(new ErrorHandler(404, "User not found"));
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return next(new ErrorHandler(401, "Invalid token"));
  }
});
