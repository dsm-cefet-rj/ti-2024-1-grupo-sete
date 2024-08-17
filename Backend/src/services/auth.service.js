import User from '../models/User.js';

const loginService = (email) => User.findOne({email: email}).select("+senha");
//Entre as chaves está o filtro da pesquisa de findOne que recebe  valor de email que o loginService recebe em "(email) =>"

export { loginService }