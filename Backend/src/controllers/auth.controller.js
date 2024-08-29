import bcrypt from 'bcryptjs';
import { loginService, generateToken } from '../services/auth.service.js';

const login = async (req, res) => {
    //Dados do formulário
    const {email, senha} = req.body;
    try{
        const user = await loginService(email);

        //Valida email
        if(!user){
            return res.status(404).send({message: "Usuário ou senha inválida"});
        }

        //Coleta senha através do bcrypt e retorna boolean
        const senhaIsValid = bcrypt.compareSync(senha, user.senha);
        //Valida email
        if(!senhaIsValid){
            return res.status(404).send({message: "Usuário ou senha inválida"});
        }

        const token = generateToken(user.id);

        res.send({token});
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export { login };