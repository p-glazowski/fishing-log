function errorHandler(err, req, res, next) {
  console.error(err);

  let status = err.status || err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  if (err.code === 11000) {
    status = 409;
    message = 'A record with this value already exists';
  } else if (err.name === 'ValidationError') {
    status = 400;
  } else if (err.name === 'CastError') {
    status = 400;
    message = 'Invalid resource ID';
  }

  if (status >= 500) {
    status = 500;
    message = 'Internal Server Error';
  }

  return res.status(status).json({
    msg: message,
    data: null,
  });
}

module.exports = errorHandler;
