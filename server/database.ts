import mongoose from 'mongoose';

const config = useRuntimeConfig();

export default async () => {
  try {
    await mongoose.connect(config.mongoUrl);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error.error('Error connecting to MongoDB:', err);
  }
};
