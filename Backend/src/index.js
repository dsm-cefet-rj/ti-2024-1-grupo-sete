import express from 'express';
import connectDatabase from './src/database/db.js';
import userRoute from './src/routes/user.route.js';
import authRoute from './src/routes/auth.route.js';
import carrosRoute from './src/routes/carros.route.js';


const port = 5000;
const app = express();

connectDatabase();

app.use(express.json());
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/carros", carrosRoute);

//app.get('/', function (req, res) {
//  res.send('Hello World')
//})

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));