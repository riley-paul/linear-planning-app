import express from "express";
import {
  getCenterline,
  addCenterline,
  deleteCenterline,
  updateCenterline,
} from "../controllers/centerline.js";
const router = express.Router();

// get specific Centerline
router.get("/:id", getCenterlines);

// new Centerline
router.post("/", addCenterline);

// delete Centerline
router.delete("/:id", deleteCenterline);

// update Centerline
router.patch("/:id", updateCenterline);

export default router;
