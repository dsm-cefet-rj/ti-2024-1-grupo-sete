import mongoose from 'mongoose';

//Schema: Limita como os documentos serão criados
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    senha: {
        type: String,
        required: true,
        select: false,
    },
    imagem: {
        type: String,
        required: true,
    },

});

const User = mongoose.model("User", UserSchema)
//indica pro mongoose que ("User", UserSchema) é uma model. Nome da model -> "User", de onde ela vem -> UserSchema

export default User