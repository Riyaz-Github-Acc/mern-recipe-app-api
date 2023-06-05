import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoute from "./src/routes/userRoute.js";
import recipeRoute from "./src/routes/recipeRoute.js";

const app = express();

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("Connected to MongoDB");
  } catch (err) {
    throw err;
  }
};

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/auth", userRoute);
app.use("/recipes", recipeRoute);

app.listen(3100, () => {
  connect();
  console.log("SERVER STARTED!!!");
});
