import { verfiyToken } from "../helpers/verifyToken.js";

import express from "express";
import {
  getById,
  getAll,
  create,
  remove,
  update,
} from "../controllers/project.js";

const router = express.Router();
router.use(verfiyToken);

router.get("/:id", getById);
router.get("/", getAll);
router.post("/", create);
router.delete("/:id", remove);
router.patch("/:id", update);

export default router;
