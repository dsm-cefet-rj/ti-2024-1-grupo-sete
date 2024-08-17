import express from 'express';
import {create, findAll} from '../controllers/carros.controller.js';

const route = express.Router();

route.post("/", create);
route.get("/", findAll);

export default route;