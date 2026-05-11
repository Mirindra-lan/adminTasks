import express from "express";
import { login, logout, createUser } from "../controllers/authController.js";
const router = express.Router();

router.post("/api/register", createUser);
router.get("/api/logout", logout);
router.post("/api/login", login);

export default router;