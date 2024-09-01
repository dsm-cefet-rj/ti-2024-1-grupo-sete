import Carros from "../models/Carros.js";

const createService = (body) => Carros.create(body);

const findAllService = (offset, limit) => Carros.find().sort({_id: -1}).skip(offset).limit(limit).populate("user");
//Sort ordena por meio de ID. -1 indica que está ordenando a partir do ultimo carro criado
//offset seta o inicio da busca no banco de dados
//limit define a intercalacao. Nesse caso, intercala a cada 5 carros no banco de dados
//populate busca o id de user que criou carro para invocar todos os argumentos de user dentro do carro, como nome, endereco, telefone, para ser usado em cards de resultado de pesquisa e pagina de detalhes do carro, por exemplo

const countCarros = () => Carros.countDocuments();

const topCarrosService = () => Carros.find().sort({_id: -1}).populate("user").limit(3);

const findByIdService = (id) => Carros.findById(id).populate("user");


//$regex: `{modelo || ""}` significa que pode mandar nome do modelo completo ou parte dele
//$options: "i" significa que é case Insensitive
const searchByModeloService = (modelo) => 
    Carros.find({
        modelo: {$regex: `${modelo || ""}`, $options: "i"},
    })
    .sort({_id: -1})
    .populate("user");

//Procura carros por meio de 1 user 
const byUserService = (id) => Carros.find({user: id})
    .sort({_id: -1})
    .populate("user");

const updateService = (id, modelo, ano, cidade, precoPorDia, detalhes, fotoLink1, diasAlugado) => 
    Carros.findOneAndUpdate({_id: id}, {modelo, ano, cidade, precoPorDia, detalhes, fotoLink1, diasAlugado},
    {
        rawResult: true,
    } 
    );

//{_id: id} procura pelo _id e passa o id que recebi pelo parâmetro
const apagarCarroService = (id) => Carros.findOneAndDelete({_id: id});

export { createService, findAllService, countCarros, topCarrosService, findByIdService, searchByModeloService, byUserService, updateService, apagarCarroService };