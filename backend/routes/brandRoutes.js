const express = require('express');
const route = express.Router();
const brandController = require('../controllers/brandController');

route.get('/', brandController.getAllBrands);

module.exports = route;
