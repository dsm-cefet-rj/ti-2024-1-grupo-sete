import express from 'express';
import { create } from "../controllers/registro.controller.js"
import {authMiddleware} from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post("/:id", authMiddleware, create);

export default router;
