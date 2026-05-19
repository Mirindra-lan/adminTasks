import { Router } from "express";
import { createTask, getAllTasks } from "../controllers/taskController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();
router.post("/api/task", authMiddleware, createTask);
router.get("/api/tasks", authMiddleware, getAllTasks);

export default router;