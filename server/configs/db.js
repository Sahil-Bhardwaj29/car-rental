import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectInstance = await mongoose.connect(`${process.env.MONGODB_URI}/car-rental`);
    console.log(`\n MongoDB connected!! DB HOST: ${connectInstance.connection.host}`);
    
  } catch (error) {
    console.log(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
}
export default connectDB;