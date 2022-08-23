import { init, drop } from "../controllers/db.js";
import express from "express";

const router = express.Router();

router.get("/init", init);
router.get("/drop", drop);

export default router;
