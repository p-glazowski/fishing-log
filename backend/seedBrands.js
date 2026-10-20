require('dotenv').config();

const mongoose = require('mongoose');
const Brand = require('./models/Brand');

const brands = [
  { name: 'Rapala', originCountry: 'Finland' },
  { name: 'Savage Gear', originCountry: 'Denmark' },
  { name: 'Westin', originCountry: 'Denmark' },
  { name: 'Strike King', originCountry: 'United States' },
  { name: 'Berkley', originCountry: 'United States' },
  { name: 'Megabass', originCountry: 'Japan' },
  { name: 'Jackall', originCountry: 'Japan' },
  { name: 'Daiwa', originCountry: 'Japan' },
  { name: 'Shimano', originCountry: 'Japan' },
  { name: 'Yo-Zuri', originCountry: 'Japan' },
];

async function seedBrands() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    for (const brand of brands) {
      await Brand.updateOne(
        { name: brand.name },
        { $setOnInsert: brand },
        { upsert: true },
      );
    }

    console.log('Brands seeded successfully!');
  } catch (error) {
    console.error('Error seeding brands:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedBrands();
