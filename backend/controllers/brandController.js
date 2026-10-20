const mongoose = require('mongoose');
const Brand = require('../models/Brand');
const responseBody = require('../utils/responseBody');

// GET /api/brands
async function getAllBrands(req, res) {
  const brands = await Brand.find().sort({ name: 1 });

  return responseBody(res, 200, 'Brands fetched successfully', brands);
}

// GET /api/brands/:id
async function getBrandById(req, res) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    const error = new Error('Invalid brand ID');
    error.status = 400;
    throw error;
  }

  const brand = await Brand.findById(id);

  if (!brand) {
    const error = new Error('Brand not found');
    error.status = 404;
    throw error;
  }

  return responseBody(res, 200, 'Brand fetched successfully', brand);
}

// POST /api/brands
async function createBrand(req, res) {
  const { name, imageUrl, originCountry } = req.body;

  if (typeof name !== 'string' || !name.trim()) {
    const error = new Error('Brand name is required');
    error.status = 400;
    throw error;
  }

  const brand = await Brand.create({
    name: name.trim(),
    imageUrl,
    originCountry,
  });

  return responseBody(res, 201, 'Brand created successfully', brand);
}

// PATCH /api/brands/:id
async function updateBrand(req, res) {
  const { id } = req.params;
  const { name, imageUrl, originCountry } = req.body;

  if (!mongoose.isValidObjectId(id)) {
    const error = new Error('Invalid brand ID');
    error.status = 400;
    throw error;
  }

  const updates = {};

  if (name !== undefined) {
    if (typeof name !== 'string' || !name.trim()) {
      const error = new Error('Brand name cannot be empty');
      error.status = 400;
      throw error;
    }

    updates.name = name.trim();
  }

  if (imageUrl !== undefined) updates.imageUrl = imageUrl;
  if (originCountry !== undefined) {
    updates.originCountry = originCountry;
  }

  if (Object.keys(updates).length === 0) {
    const error = new Error('Provide at least one field to update');
    error.status = 400;
    throw error;
  }

  const brand = await Brand.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  if (!brand) {
    const error = new Error('Brand not found');
    error.status = 404;
    throw error;
  }

  return responseBody(res, 200, 'Brand updated successfully', brand);
}

// DELETE /api/brands/:id
async function deleteBrand(req, res) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    const error = new Error('Invalid brand ID');
    error.status = 400;
    throw error;
  }

  const brand = await Brand.findByIdAndDelete(id);

  if (!brand) {
    const error = new Error('Brand not found');
    error.status = 404;
    throw error;
  }

  return responseBody(res, 200, 'Brand deleted successfully', brand);
}

module.exports = {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
};
