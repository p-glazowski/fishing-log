function notFound(req, res) {
  return res
    .status(404)
    .json({ errorMsg: `Cannot find path ${req.method} ${req.originalUrl}` });
}

module.exports = notFound;
