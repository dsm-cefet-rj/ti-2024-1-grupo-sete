const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());

const routes = require('./routes/Routes');
app.use('/api', routes);


module.exports = app;
