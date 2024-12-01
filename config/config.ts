import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const url : any = process.env.MONGO_URI
    await mongoose.connect(url);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1); // Exit the process if MongoDB connection fails
  }
};

export default connectDB;
