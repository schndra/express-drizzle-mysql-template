import express, { Router } from "express";
const router: Router = express.Router();

import { login, register } from "../controllers/authController";

import authMiddleware from "../middleware/authMiddleware";

router.route("/login").post(login);
router.route("/register").post(register);

export default router;
