import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { userModel } from "../models/userModel.js";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });

    if (user) {
      return res.status(409).json({
        message: "User Already Exists!!!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ username, password: hashedPassword });
    await newUser.save();

    res.status(200).json({ message: "User Registered Successfully!!!" });
  } catch (err) {
    res.json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User Not Found!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Username or Password!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    res.status(200).json({ token, userID: user._id });

    // res.cookie("access_token", token, {
    //     httpOnly: true,
    // }).json({
    //     userID: user._id,
    //     username,
    // });
  } catch (err) {
    res.json({ message: err.message });
  }
};
