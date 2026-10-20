const mongoose = require('mongoose');

async function connectToMongoDB() {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    throw new Error('Please check if there is MONGO_URI in your env variables');
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log('You successfully connected to MongoDB!');
}

// Call this only when your application terminates
/* export async function disconnectFromMongoDB() {
  await mongoose.connection.close();
} */

module.exports = connectToMongoDB;
