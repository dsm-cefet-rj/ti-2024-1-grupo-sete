import {createService} from "../services/aluguel.service.js";

const create = async (req, res) => {
    try{
        console.log("Aluguel controller")
        const {valorDia, valorTotal, quantidadeDias, formaPagamento} = req.body;
        //console.log("É PREÇO!", precoPorDia) ok
        const {id} = req.params;
        console.log(req.params);

        if(!valorDia || !valorTotal || !quantidadeDias || !formaPagamento){
            res.status(400).send({ message: "Preencha a forma de pagamento" });
        }

        const aluguel = await createService({
            valorDia,
            valorTotal,//R$$$
            quantidadeDias,
            formaPagamento,
            user: req.userId,
            carro: id
        });
        console.log("Requisição okay\n\n\n\n", aluguel);
        res.status(201).send(aluguel);
    }catch(err) {
        res.status(500).send({message: err.message});
    }
}



export default { create };