import express from 'express';
import connectDatabase from './src/database/db.js';
import userRoute from './src/routes/user.route.js';

const port = 3004;
const app = express();

connectDatabase();

app.use(express.json());
app.use("/user", userRoute);

//app.get('/', function (req, res) {
//  res.send('Hello World')
//})

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));