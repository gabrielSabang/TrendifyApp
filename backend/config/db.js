import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const DB_connect = async () => {
  mongoose.connect(process.env.DB_CONNECTION)
}