import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) return console.log("mongodb url is not found");
  if (isConnected) {
    console.log("already connected to MongoDB");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log("connection established");
    
  } catch (error) {
    console.log(error);
  }
};
