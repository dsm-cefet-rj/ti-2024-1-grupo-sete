import mongoose from 'mongoose';
//import bcrypt from 'bcrypt';

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
//criptografa a senha 
//UserSchema.pre("save", async function (next){
//    this.password = await bcrypt.hash(this.password, 10)
//    next();
//})

const User = mongoose.model("User", UserSchema)
//indica pro mongoose que ("User", UserSchema) é uma model. Nome da model -> "User", de onde ela vem -> UserSchema

export default User