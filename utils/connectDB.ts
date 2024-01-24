import mongoose from "mongoose";

const connectDB = async () =>
  mongoose.connect(process.env.NEXT_MONGO_URL as string);

export default connectDB;
