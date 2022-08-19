import express from "express";
import {
  allProjects,
  getProjects,
  addProject,
  deleteProject,
  updateProject,
} from "../controllers/project.js";
import { verfiyToken } from "../verifyToken.js";
const router = express.Router();

// get all projects for user
router.get("/", verfiyToken, allProjects);

// get specific project
router.get("/:id", verfiyToken, getProjects);

// new project
router.post("/", verfiyToken, addProject);

// delete project
router.delete("/:id", verfiyToken, deleteProject);

// update project
router.patch("/:id", verfiyToken, updateProject);

export default router;
