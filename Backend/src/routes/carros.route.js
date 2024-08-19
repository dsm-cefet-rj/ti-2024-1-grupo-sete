import express from 'express';
const route = express.Router();

import {create, findAll} from '../controllers/carros.controller.js';
import {authMiddleware} from '../middlewares/auth.middleware.js';

route.post("/", authMiddleware, create);
route.get("/", findAll);

export default route;