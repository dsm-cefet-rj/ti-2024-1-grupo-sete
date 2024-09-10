import { createService, findAllService, byUserService } from "../services/registro.service.js";

const create = async (req, res) => {
    try{
        console.log("Registro controller")
        const {valorDia, valorTotal, quantidadeDias, dataDoPagamento, formaPagamento, modeloRegistro} = req.body;
        //console.log("É PREÇO!", precoPorDia) ok
        const {id} = req.params;
        //console.log(req.params);
        console.log("\n\nREGISTRO.CONTROLLER:", dataDoPagamento, "\n\n");
        if(!valorDia || !valorTotal || !quantidadeDias || !formaPagamento){
            res.status(400).send({ message: "Preencha todos os campos." });
        }

        //const carros = await findByIdService(id);
        console.log("\n\nreq.userId:", req.userId, id)
        const registro = await createService({
            valorDia,
            valorTotal,//R$$$
            quantidadeDias,
            dataDoPagamento,
            formaPagamento,
            modeloRegistro,
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

const findAll = async (req, res) => {
    try{
        const registro = await findAllService();
        if(!registro){
            return res.status(400).send({ message: "Nenhum registro foi encontrado"})
        }

        //console.log(registro[1].user.name)

        res.send({
            results: registro.map((registros) => ({
                id: registros._id,
                valorDia: registros.valorDia,
                valorTotal: registros.valorTotal,
                quantidadeDias: registros.quantidadeDias,
                dataDoPagamento: registros.dataDoPagamento,
                formaPagamento: registros.formaPagamento,
                modeloRegistro: registros.modeloRegistro,
                userId: registros.user._id,
                userName: registros.user.name,
                userEmail: registros.user.email,
                userEndereco: registros.user.endereco,
                carroModelo: registros.carro.modelo,
                //carroId: registros.carro._id,
                // modelo: registros.carro.modelo,
                // fotoLink1: registros.fotoLink1,
                // diasAlugado: registros.diasAlugado,
                // dataCriado: registros.dataCriado,
            })),
        });

    }catch(err) {
        res.status(500).send({message: err.message});
    }
}

const byUser = async (req, res) => {
    try{
        const id = req.userId;
        const registro = await byUserService(id);

        console.log('Registro:', registro);
        return res.send({
            results: registro.map((registroItem) => ({
                id: registroItem._id,
                valorDia: registroItem.valorDia,
                valorTotal: registroItem.valorTotal,
                quantidadeDias: registroItem.quantidadeDias,
                modeloRegistro: registroItem.modeloRegistro,
                userId: registroItem.user._id,
                userName: registroItem.user.name
            })),
        });
    }catch(err) {
        res.status(500).send({message: err.message});
    }
};

export { create, findAll, byUser };