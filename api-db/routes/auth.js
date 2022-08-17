import express from "express";
import { signin, signup } from "../controllers/auth.js";
const router = express.Router();

// REGISTER
router.post("/signup", signup);

// LOGIN
router.post("/signin", signin);

// GOOGLE AUTH
router.post("/google");

export default router;
