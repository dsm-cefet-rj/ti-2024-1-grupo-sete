import express from 'express';
import aluguelController from '../controllers/aluguel.controller.js';
import {authMiddleware} from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post("/:id", authMiddleware, aluguelController.create);
router.get("/", authMiddleware, aluguelController.findAll);
router.get("/byUser", authMiddleware, aluguelController.byUser);

export default router;

