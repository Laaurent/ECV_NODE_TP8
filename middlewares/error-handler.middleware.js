const HTTPStatus = require('statuses');

const errorHandler = (err, req, res, next) => {

  if (res.headerSent) {
    return next(err);
  }

  if(process.env.APP_ENV === "production") {
    message = "Server Error";
  } else {
    message = err.toString();
  }

  res
  .status(err.status)
  .json({
    status: err.status,
    message: HTTPStatus.STATUS_CODES[err.status],
  });

  res.end();
}

module.exports = errorHandler;

