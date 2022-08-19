import express from "express";
import {
  getCenterline,
  addCenterline,
  deleteCenterline,
  updateCenterline,
} from "../controllers/centerline.js";
const router = express.Router();

// routes
router.get("/:id", getCenterline);
router.post("/", addCenterline);
router.delete("/:id", deleteCenterline);
router.patch("/:id", updateCenterline);

export default router;
