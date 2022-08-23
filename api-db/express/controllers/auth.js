import { models } from "../../sequelize/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const saltRounds = 10;

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    const result = await models.user.create({ name, email, hash });
    const token = jwt.sign({ id: result.id }, process.env.JWT);

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(result);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const result = await models.user.findOne({ where: { email } });
    if (!result) return res.status(401).send("User not found");

    const validPassword = await bcrypt.compare(password, result.hash);
    if (!validPassword) return res.status(400).send("Incorrect credentials");

    const token = jwt.sign({ id: result.id }, process.env.JWT);

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(result);
  } catch (err) {
    res.status(500).send(err);
  }
}

export const logout = async (req, res, next) => {
  res.clearCookie("access_token").status(200).send("Logout successful");
};
