import express, { Router } from "express";
const router: Router = express.Router();

import { login, register, testAuthRoutes } from "../controllers/auth-controller";

import authMiddleware from "../middleware/authMiddleware";

router.route("/login").post(login);
router.route("/register").post(register);

router.route("/test").get(authMiddleware, testAuthRoutes);

export default router;
