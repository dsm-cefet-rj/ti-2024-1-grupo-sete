import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const loginService = (email) => User.findOne({email: email}).select("+senha");
//Entre as chaves está o filtro da pesquisa de findOne que recebe  valor de email que o loginService recebe em "(email) =>"

const generateToken = (id) => jwt.sign({id: id}, process.env.CHAVE_JWT, {expiresIn: 86400});

export { loginService, generateToken };