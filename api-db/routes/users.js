import express from "express";
import { deleteUser, getUser, updateUser } from "../controllers/user.js";
import { verfiyToken } from "../verifyToken.js";
const router = express.Router();

// update user
router.put("/:id", verfiyToken, updateUser);

// delete user
router.delete("/:id", verfiyToken, deleteUser);

// get a user
router.get("/:id", verfiyToken, getUser);

export default router;
