import { verfiyToken } from "../helpers/verifyToken.js";

import express from "express";
import { getById, create, remove, update } from "../controllers/takeoff.js";

const router = express.Router();
router.use(verfiyToken);

router.get("/:id", getById);
router.post("/", create);
router.delete("/:id", remove);
router.patch("/:id", update);

export default router;
