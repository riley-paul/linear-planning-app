import express from "express";
import {
  getById,getAll,create
} from "../controllers/centerline.js";
const router = express.Router();

// routes
router.get("/:id", getById);
router.get("/", getAll);
router.post("/", create);
// router.delete("/:id", deleteCenterline);
// router.patch("/:id", updateCenterline);

export default router;
