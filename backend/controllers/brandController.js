async function getAllBrands(req, res) {
  res.status(200).json({ data: 'all brands' });
}

module.exports = {
  getAllBrands,
};
