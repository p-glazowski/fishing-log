import mongoose from 'mongoose';

export async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('You successfully connected to MongoDB!');
    return mongoose;
  } catch (err) {
    console.error(err);
    process.exit();
  }
}

// Call this only when your application terminates
/* export async function disconnectFromMongoDB() {
  await mongoose.connection.close();
} */
