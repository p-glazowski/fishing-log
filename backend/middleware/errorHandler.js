function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(400).json({ errorMsg: `Internal error`, error: err });
}

module.exports = errorHandler;
