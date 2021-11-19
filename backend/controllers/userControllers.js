const catchAsyncError = require("../utils/catchAsyncError");
const HandleError = require("../utils/handleError");
const UserModel = require("../models/userModel");
const sendCookieWithToken = require("../utils/sendCookieWithToken");

// --- POST --- http://base_url/user/register
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const newUser = await UserModel.create(req.body);

  sendCookieWithToken(newUser, res, 200, `${newUser.pseudo} est inscrit`);
});

// --- POST --- http://base_url/user/login
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new HandleError("Veuillez entrer un email et un mot de passe"));
  }

  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    return next(new HandleError("Email introuvable...", 404));
  }

  const isValidPassword = await user.verifyPassword(req.body.password);

  if (!isValidPassword) {
    return next(new HandleError("Veuillez entrer un mot de passe valide"));
  }

  sendCookieWithToken(user, res, 200, `${user.pseudo} est connecté`);
});

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const allUsers = await UserModel.find({});

  if (!allUsers.length) {
    return next(new HandleError("Aucun user de trouvé..."));
  }

  res.status(200).json({
    success: true,
    allUsers,
  });
});
