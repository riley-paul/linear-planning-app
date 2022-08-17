import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
const router = express.Router()

// REGISTER
router.post("/signup");

// LOGIN
router.post("/signin");

// GOOGLE AUTH
router.post("/google");

export default router;
