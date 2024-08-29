import express from 'express';
const route = express.Router();

import {create, findAll, topCarros, findById} from '../controllers/carros.controller.js';
import {authMiddleware} from '../middlewares/auth.middleware.js';

route.post("/", authMiddleware, create);
route.get("/", findAll);
route.get("/top", topCarros);
route.get("/:id", findById);

export default route;