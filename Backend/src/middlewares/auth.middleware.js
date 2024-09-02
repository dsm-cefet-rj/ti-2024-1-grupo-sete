import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import userService from "../services/user.service.js"

dotenv.config();

export const authMiddleware = (req, res, next) => {
    try{
        const { authorization } = req.headers;
        //console.log("Authorization: ", authorization);
        if(!authorization){
            return res.send(401);
        }
    
        const parts = authorization.split(" ");
        
        //console.log("Parts: ",parts);
        
        if(parts.length!== 2){
            //console.log("AQUI LENGTH");
            return res.send(401);
        }
    
        const [schema, token] = parts;
        
        if(schema !== "Bearer"){
            //console.log("AQUI BEARER", schema);
            return res.send(401);
        }
    
        //Valida o token que está representado por process.env.CHAVE_JWT !!
        jwt.verify(token, process.env.CHAVE_JWT, async (error, decoded) => {
            if(error){
                return res.status(401).send({message: "Token inválido!"});
            }
            
            const user = await userService.findByIdService(decoded.id);

            if(!user || !user.id) {
                return res.status(401).send({message: "Token inválido!"});
            }
            //req.userId vai ser usado em carros.controller para passar o id do usuario criador do carro
            req.userId = user.id;

            //console.log('USER: \n\n\n\n\n', user, req.userId, "\n\n\n\n");
            return next();
        });
    } catch(err){
        res.status(500).send(err.message);
    }
};