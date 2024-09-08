import express from 'express';
import { create, findAll } from "../controllers/registro.controller.js"
import {authMiddleware} from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post("/:id", authMiddleware, create);
router.get("/", authMiddleware, findAll);

export default router;
