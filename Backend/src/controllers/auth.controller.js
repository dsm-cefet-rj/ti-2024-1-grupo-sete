import bcrypt from 'bcryptjs';
import { loginService, generateToken } from '../services/auth.service.js';

const login = async (req, res) => {
    //Dados do formulário
    const {email, senha} = req.body;
    try{
        const user = await loginService(email);
        //console.log("XUXAAAAAAAAAAAAAAAAA", {user: { id: user.id, email: user.email }});

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
        console.log("TESTANDO RESPOSTA", {user: { id: user.id, email: user.email, name: user.name, telefone: user.telefone, endereco: user. endereco }});

        res.send({token, 
            user: { 
                id: user.id, 
                email: user.email,
                name: user.name,
                telefone: user.telefone,
                endereco: user.endereco
            }}
        );
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export { login };