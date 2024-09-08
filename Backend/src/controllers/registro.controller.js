import { createService } from "../services/registro.service.js";

const create = async (req, res) => {
    try{
        console.log("Registro controller")
        const {valorDia, valorTotal, quantidadeDias, formaPagamento} = req.body;
        //console.log("É PREÇO!", precoPorDia) ok
        const {id} = req.params;
        //console.log(req.params);

        if(!valorDia || !valorTotal || !quantidadeDias || !formaPagamento){
            res.status(400).send({ message: "Preencha todos os campos." });
        }

        //const carros = await findByIdService(id);

        const registro = await createService({
            valorDia,
            valorTotal,//R$$$
            quantidadeDias,
            formaPagamento,
            user: req.userId,
            carro: id,
        });
        console.log("\n\nRegistro criado foi esse => ", registro,"\n\n");
        res.status(201).send(
            registro
        );
    }catch(err) {
        res.status(500).send({message: err.message});
    }
}

export { create };