import mongoose from 'mongoose';
// import "dotenv/config";
import dotenv from 'dotenv';
dotenv.config();

const connectDatabase = () => {
    console.log("Espere conectar com o database")

    mongoose.connect(
        process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}
    )
    .then(() => console.log("MongoDB Atlas conectado"))
    .catch((error) => console.log(error));
};

export default connectDatabase;