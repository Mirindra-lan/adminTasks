import { Router } from "express";
import { createTask, getAllTasks, addContr, delTask } from "../controllers/taskController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();
router.post("/api/task", authMiddleware, createTask);
router.get("/api/tasks", authMiddleware, getAllTasks);
router.put("/api/task", authMiddleware, addContr);
router.delete("/api/task/:taskId", authMiddleware, delTask);

export default router;