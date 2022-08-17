import mongoose from "mongoose";
import bcrypt from "bcrypt"
const saltRounds = 10;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "can't be blank"],
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
      unique: true,
    },
    image: String,
    hash: String,
    salt: String,
  },
  { timestamps: true }
);

UserSchema.methods.setPassword = async function (password) {
  try {
    this.salt = await bcrypt.genSalt(saltRounds);
    this.hash = await bcrypt.hashSync(password, salt);
  } catch (err) {
    console.error(err);
  }
};

UserSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.hash);
};

export default mongoose.model("User", UserSchema);
