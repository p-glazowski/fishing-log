function responseBody(res, status, message, data = null) {
  return res.status(status).json({
    msg: message,
    data,
  });
}

module.exports = responseBody;
