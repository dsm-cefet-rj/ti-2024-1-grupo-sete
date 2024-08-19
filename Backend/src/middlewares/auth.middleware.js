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
    
        //Valida o token que está entre aspas !!Colocar este token na variável de ambiente com nome SECRET_JWT!!
        jwt.verify(token, "9818f29b6e7219134d39b5f28b49ebba", async (error, decoded) => {
            if(error){
                return res.status(401).send({message: "Token inválido!"});
            }
            
            const user = await userService.findByIdService(decoded.id)

            if(!user || !user.id) {
                return res.status(401).send({message: "Token inválido!"});
            }
    
            req.userId = user.id;
        
            return next();
        });
    } catch(err){
        res.status(500).send(err.message);
    }
};