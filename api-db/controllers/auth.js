import { createError } from "../error.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email });
    await newUser.setPassword(password);
    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(createError(401, "User not found"));

    const validPassword = await user.validPassword(password);
    if (!validPassword) return next(createError(400, "Incorrect credentials"));

    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const { hash, ...others } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json("Logout successful");
  } catch (err) {
    next(err);
  }
};
