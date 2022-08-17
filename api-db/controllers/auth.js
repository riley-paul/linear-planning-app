import mongoose from "mongoose";
import User from "../models/User.js";

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email });
    await newUser.setPassword(password);

    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    next(err)
  }
};

export const signin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email });
    await newUser.setPassword(password);

    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    next(err)
  }
};
