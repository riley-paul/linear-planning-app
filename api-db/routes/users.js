import express from "express";
import { deleteUser, getUser, updateUser } from "../controllers/user.js";
import { verfiyToken } from "../verifyToken.js";
const router = express.Router();

// update user
router.patch("/:id", updateUser);

// delete user
router.delete("/:id", deleteUser);

// get a user
router.get("/:id", getUser);

export default router;
