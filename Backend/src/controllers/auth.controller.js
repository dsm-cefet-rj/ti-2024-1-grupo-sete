/**
 * @fileoverview Controlador para autenticação de usuários, incluindo o login com validação de email e senha, e a geração de um token JWT.
 * @requires bcryptjs
 * @requires ../services/auth.service
 */
import bcrypt from 'bcryptjs';
import { loginService, generateToken } from '../services/auth.service.js';

/**
 * Realiza o login de um usuário, validando as credenciais e retornando um token JWT.
 * @async
 * @function
 * @param {Object} req - Objeto da requisição.
 * @param {Object} req.body - Corpo da requisição, deve conter 'email' e 'senha'.
 * @param {string} req.body.email - Email do usuário.
 * @param {string} req.body.senha - Senha do usuário.
 * @param {Object} res - Objeto de resposta.
 * @returns {Promise<void>}
 */
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
        //Valida senha
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
                endereco: user.endereco,
                isAdm: user.isAdm
            }}
        );
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export { login };