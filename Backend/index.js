import express from 'express';
import connectDatabase from './src/database/db.js';
import userRoute from './src/routes/user.route.js';
import authRoute from './src/routes/auth.route.js';
import carrosRoute from './src/routes/carros.route.js';
import aluguelRoute from './src/routes/aluguel.route.js';
//import "dotenv/config";
//require('dotenv').config()
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';


const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
connectDatabase();

app.use(express.json());
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/carros", carrosRoute);
app.use("/aluguel", aluguelRoute);

//app.get('/', function (req, res) {
//  res.send('Hello World')
//})

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));