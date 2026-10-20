const express = require('express');
const router = express.Router();

const {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
} = require('../controllers/brandController');

router.route('/').get(getAllBrands).post(createBrand);

router.route('/:id').get(getBrandById).patch(updateBrand).delete(deleteBrand);

module.exports = router;
