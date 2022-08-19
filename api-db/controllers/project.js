import { createError } from "../error.js";
import Project from "../models/Project.js";

export const allProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ userId: req.user.id });
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
};

export const getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project.userId !== req.user.id)
      return next(createError(403, "Do not have access to projects"));

    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
};

export const addProject = async (req, res, next) => {
  try {
    const project = new Project({ userId: req.user.id, ...req.body });
    await project.save();
    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project.userId !== req.user.id)
      return next(createError(403, "Do not have access to projects"));

    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json("Project deleted");
  } catch (err) {
    next(err);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project.userId !== req.user.id)
      return next(createError(403, "Do not have access to projects"));

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProject);
  } catch (err) {
    next(err);
  }
};

// export const allProjects = async (req, res, next) => {
//   try {
//     const projects = await Project.find({ userId: req.user.id });
//     res.status(200).json(projects);
//   } catch (err) {
//     next(err);
//   }
// };
