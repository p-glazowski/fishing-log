const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      default: '/images/brands/placeholder.png',
    },
    originCountry: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
