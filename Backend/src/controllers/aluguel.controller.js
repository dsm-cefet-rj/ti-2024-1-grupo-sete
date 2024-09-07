import {createService} from "../services/aluguel.service.js";

const create = async (req, res) => {
    try{
        console.log("Aluguel controller")
        const {valorDia, valorTotal, quantidadeDias} = req.body;
        //console.log("É PREÇO!", precoPorDia) ok
        const {id} = req.params;
        console.log(req.params);

        if(!valorDia || !valorTotal || !quantidadeDias){
            res.status(400).send({ message: "Preencha todos os campos." });
        }

        const aluguel = await createService({
            valorDia,
            valorTotal,//R$$$
            quantidadeDias,
            user: req.userId,
            carro: id
        });
        console.log("\n\nAluguel criado foi esse>\n\n", aluguel);
        res.status(201).send(aluguel);
    }catch(err) {
        res.status(500).send({message: err.message});
    }
};



export default { create };