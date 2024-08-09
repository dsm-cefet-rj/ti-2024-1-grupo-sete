import mongoose from 'mongoose';

const connectDatabase = () => {
    console.log("Espere conectar com o database")

    mongoose.connect(
        "mongodb+srv://DriveZoom:DriveZoom@cluster0.wa1pziu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {useNewUrlParser: true, useUnifiedTopology: true}
    )
    .then(() => console.log("MongoDB Atlas conectado"))
    .catch((error) => console.log(error));
};

export default connectDatabase;