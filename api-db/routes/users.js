import express from "express";
import { deleteUser, readUser, updateUser } from "../controllers/user.js";
import { verfiyToken } from "../verifyToken.js";
const router = express.Router();

// update user
router.put("/:id", verfiyToken, updateUser);

// delete user
router.delete("/:id", deleteUser);

// get a user
router.get("/:id", readUser);

export default router;
