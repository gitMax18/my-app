const catchAsyncError = require("../utils/catchAsyncError");
const UserModel = require("../models/userModel");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const newUser = await UserModel.create(req.body);

  res.status(201).json({
    succes: true,
    newUser,
  });
});
