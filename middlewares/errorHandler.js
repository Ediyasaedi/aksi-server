function errorHandler(err, req, res, next) {
  let errors = [];
  let statusCode = 500;

  switch (err.name) {
    case "SequelizeValidationError":
      err.errors.forEach((element) => {
        errors.push(element.message);
      });
      statusCode = 400;
      break;
    case "SequelizeUniqueConstraintError":
      err.errors.forEach((element) => {
        errors.push(element.message);
      });
      statusCode = 400;
      break;
    case "AuthenticationFailed":
      errors.push(err.message);
      statusCode = 401;
      break;
    case "AuthorizationFailed":
      errors.push(err.message);
      statusCode = 401;
      break;
    case "SequelizeDatabaseError":
      err.errors.forEach((element) => {
        errors.push(element.message);
      });
      statusCode = 400;
      break;
    case "NotFound":
      errors.push("data not found");
      statusCode = 404;
      break;
    default:
      errors.push(err.msg || "internal server error");
      statusCode = err.status || statusCode;
      break;
  }
  res.status(statusCode).json({ errors });
}

module.exports = errorHandler;
