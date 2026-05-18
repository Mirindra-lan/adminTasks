import { allUsers, getUser, updateUserC } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { Router } from "express";

const router = Router();
router.get("/api/profile", authMiddleware, getUser);
router.put("/api/profile", authMiddleware, updateUserC);
router.get("/api/users", authMiddleware, allUsers);

export default router;