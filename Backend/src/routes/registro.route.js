import express from 'express';
import { create, findAll, byUser } from "../controllers/registro.controller.js"
import {authMiddleware} from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post("/:id", authMiddleware, create);
router.get("/", authMiddleware, findAll);
router.get("/byUser", authMiddleware, byUser);

export default router;
