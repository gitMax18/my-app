module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (err.name === "ValidationError") {
    err.message = {};

    Object.values(err.errors).forEach(({ properties }) => {
      err.message[properties.path] = properties.message;
    });
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
