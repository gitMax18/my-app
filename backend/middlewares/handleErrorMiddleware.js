module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  console.log(err.name);

  // if (err.name === "ValidationError") {
  //   err.message = {};
  //   err.statusCode = 400;

  //   Object.values(err.errors).forEach(({ properties }) => {
  //     err.message[properties.path] = properties.message;
  //   });
  // }

  if (err.code === 11000) {
    err.message = {};
    err.statusCode = 400;

    for (propertie in err.keyValue) {
      err.message[propertie] = `"${err.keyValue[propertie]}" est déjà utilisé`;
    }
  }

  if (process.env.NODE_ENV === "developpement") {
    console.log(err.stack);
    console.log(err);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    err,
  });
};
