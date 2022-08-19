import express from "express";
import {
  allProjects,
  getProjects,
  addProject,
  deleteProject,
  updateProject,
} from "../controllers/project.js";
const router = express.Router();

// get all projects for user
router.get("/", allProjects);

// get specific project
router.get("/:id", getProjects);

// new project
router.post("/", addProject);

// delete project
router.delete("/:id", deleteProject);

// update project
router.patch("/:id", updateProject);

export default router;
