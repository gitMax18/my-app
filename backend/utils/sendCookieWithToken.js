module.exports = (user, res, statusCode, message = "") => {
  const token = user.createToken();

  res
    .cookie("token", token, {
      maxAge: process.env.EXPIRE_TIME * 24 * 60 * 60 * 60 * 1000,
      httpOnly: true,
    })
    .status(statusCode)
    .json({
      success: true,
      message,
    });
};
