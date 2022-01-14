const HTTPStatus = require('statuses');

const joiErrorHandler = (err, req, res, next) => {

  if (err && err.error && err.error.isJoi) {
    const errors = err.error.details.map(el => ({
      property: el.context.key,
      msg: el.message.replace('\"', "").replace('\"', "")
    }));

    return res
    .status(400)
    .json(errors);

  }

  next(err);
}

module.exports = joiErrorHandler;

