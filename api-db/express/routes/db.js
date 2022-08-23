import { init } from "../controllers/db.js";
import express from "express";

const router = express.Router();

router.get("/init", init);

export default router;
