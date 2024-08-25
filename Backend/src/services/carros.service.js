import Carros from "../models/Carros.js"

const createService = (body) => Carros.create(body);

const findAllService = (offset, limit) => Carros.find().sort({_id: -1}).skip(offset).limit(limit).populate("user");
//Sort ordena por meio de ID. -1 indica que está ordenando a partir do ultimo carro criado
//offset seta o inicio da busca no banco de dados
//limit define a intercalacao. Nesse caso, intercala a cada 5 carros no banco de dados
//populate busca o id de user que criou carro para invocar todos os argumentos de user dentro do carro, como nome, endereco, telefone, para ser usado em cards de resultado de pesquisa e pagina de detalhes do carro, por exemplo

const countCarros = () => Carros.countDocuments();

const topCarrosService = () => Carros.find().sort({_id: -1}).populate("user").limit(3);

export {createService, findAllService, countCarros, topCarrosService};