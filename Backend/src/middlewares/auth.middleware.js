import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import userService from "../services/user.service.js"

dotenv.config();

export const authMiddleware = (req, res, next) => {
    try{
        const { authorization } = req.headers;
        
        if(!authorization){
            return res.send(401);
        }
    
        const parts = authorization.split(" ");
    
        if(parts.length!== 2){
            return res.send(401);
        }
    
        const [schema, token] = parts;
        
        if(schema !== "Bearer"){
            return res.send(401);
        }
    
        //Valida o token que está representado por process.env.CHAVE_JWT !!
        jwt.verify(token, process.env.CHAVE_JWT, async (error, decoded) => {
            if(error){
                return res.status(401).send({message: "Token inválido!"});
            }
            
            const user = await userService.findByIdService(decoded.id)

            if(!user || !user.id) {
                return res.status(401).send({message: "Token inválido!"});
            }
            //req.userId vai ser usado em carros.controller para passar o id do usuario criador do carro
            req.userId = user.id;
            
            return next();
        });
    } catch(err){
        res.status(500).send(err.message);
    }
};