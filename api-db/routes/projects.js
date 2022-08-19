import express from "express";
import {
  allProjects,
  getProject,
  addProject,
  deleteProject,
  updateProject,
} from "../controllers/project.js";
import { verfiyToken } from "../verifyToken.js";
const router = express.Router();

router.use(verfiyToken);

// routes
router.get("/", allProjects);
router.get("/:id", getProject);
router.post("/", addProject);
router.delete("/:id", deleteProject);
router.patch("/:id", updateProject);

export default router;
