import axios from "axios";
const baseURL = "http://localhost:5000";

/**
 * Obtém todos os carros associados ao usuário atual.
 * @function getAllCarrosByUser
 * @returns {Promise<AxiosResponse<any>>} A promessa de uma resposta Axios contendo todos os carros do usuário.
 * @description
 * Esta função realiza uma solicitação GET para o endpoint '/carros/byUser' no servidor localizado em 'http://localhost:5000'.
 * Inclui um token de autenticação no cabeçalho da solicitação, que é recuperado do armazenamento local.
 * A função retorna uma promessa que resolve com a resposta da solicitação Axios.
 */
export function getAllCarrosByUser(){
    const tokenGetCarrosByUser = localStorage.getItem('token');
    const response = axios.get(`${baseURL}/carros/byUser`, {
        headers: {
            Authorization: `Bearer ${tokenGetCarrosByUser}`
        },
    });
    return response;
};

/**
 * Cria um novo carro no servidor.
 * @async
 * @function criarCarro
 * @param {Object} body - O corpo da solicitação, contendo os dados do carro a ser criado.
 * @returns {Promise<Object>} A promessa que resolve com a resposta do servidor.
 * @throws {Error} Se o token não for encontrado, um erro é lançado.
 * @description
 * Esta função realiza uma solicitação POST para o endpoint '/carros' no servidor localizado em 'http://localhost:5000'.
 * Inclui um token de autenticação no cabeçalho da solicitação, que é recuperado do armazenamento local.
 * A função retorna uma promessa que resolve com os dados da resposta do servidor.
 * Se o token não for encontrado no armazenamento local, um erro é lançado.
 */
export async function criarCarro(body) {
    const tokenCria = localStorage.getItem('token');
    if (!tokenCria) {
        throw new Error("Token não encontrado. Verifique se o usuário está autenticado.");
    }

    try {
        console.log("CRIAR CARRO AQUI", body);
        
        const response = await axios.post(`${baseURL}/carros`, body, {
            headers: {
                Authorization: `Bearer ${tokenCria}`
            },
        });
        console.log("Resposta do servidor:", response.data);
        return response.data; // Return response data if needed
    } catch (error) {
        console.error("Erro ao criar carro:", error.response ? error.response.data : error.message);
        throw error;
    }
};

/**
 * Obtém todos os carros do servidor.
 * @function getAllCarros
 * @returns {Promise<AxiosResponse<any>>} A promessa de uma resposta Axios contendo todos os carros.
 * @description
 * Esta função realiza uma solicitação GET para o endpoint '/carros/' no servidor localizado em 'http://localhost:5000'.
 * Inclui um token de autenticação no cabeçalho da solicitação, que é recuperado do armazenamento local.
 * A função retorna uma promessa que resolve com a resposta da solicitação Axios.
 */
export function getAllCarros(){
    const tokenAll = localStorage.getItem('token');
    console.log("\n\n\n\nGETALLCARROS TOKEN: ", tokenAll)
    const response = axios.get(`${baseURL}/carros/`, {
        headers: {
            Authorization: `Bearer ${tokenAll}`
        },
    });
    return response;
} 

/**
 * Encontra um carro pelo ID.
 * @async
 * @function findCarroById
 * @param {string} id - O ID do carro a ser encontrado.
 * @returns {Promise<AxiosResponse<any>>} A promessa de uma resposta Axios contendo os dados do carro.
 * @description
 * Esta função realiza uma solicitação GET para o endpoint '/carros/${id}' no servidor localizado em `http://localhost:5000`.
 * Inclui um token de autenticação no cabeçalho da solicitação, que é recuperado do armazenamento local.
 * A função retorna uma promessa que resolve com a resposta da solicitação Axios.
 */
export async function findCarroById(id){
    const tokenAll = localStorage.getItem('token');
    console.log("\n\nDentro de findCarroById:\n\n", `http://localhost:5000/carros/${id}`);
    console.log("\n\nTOKEN findCarroById:\n\n", tokenAll);
    const response = await axios.get(`http://localhost:5000/carros/${id}`,
    {
        headers: {
            Authorization: `Bearer ${tokenAll}`
        },
    });
    return response;
}

/**
 * Atualiza os dias alugados para um carro específico.
 * @async
 * @function updateDiasAlugado
 * @param {string} id - O ID do carro a ser atualizado.
 * @param {Array<number>} diasAlugado - Um array contendo os dias alugados para o carro.
 * @returns {Promise<AxiosResponse<any>>} A promessa de uma resposta Axios após a atualização.
 * @description
 * Esta função realiza uma solicitação PATCH para o endpoint '/carros/diasAlugado/${id}' no servidor localizado em 'http://localhost:5000'.
 * Inclui um token de autenticação no cabeçalho da solicitação, que é recuperado do armazenamento local.
 * A função retorna uma promessa que resolve com a resposta da solicitação Axios.
 */
export async function updateDiasAlugado(id, diasAlugado) {
    const token = localStorage.getItem('token');
    console.log("\n\nDentro de updateDiasAlugado:\n\n");
    const response = await axios.patch(`http://localhost:5000/carros/diasAlugado/${id}`,{carroId: id, diasAlugadoArray: diasAlugado}, 
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    return response;
};

/**
 * Atualiza as informações de um carro específico pelo usuário.
 * @async
 * @function updateCarroByUser
 * @param {string} carroId - O ID do carro a ser atualizado.
 * @param {Object} body - O corpo da solicitação, contendo os dados atualizados do carro.
 * @returns {Promise<AxiosResponse<any>>} A promessa de uma resposta Axios após a atualização.
 * @description
 * Esta função realiza uma solicitação PATCH para o endpoint '/carros/${carroId}' no servidor localizado em 'http://localhost:5000'.
 * Inclui um token de autenticação no cabeçalho da solicitação, que é recuperado do armazenamento local.
 * A função retorna uma promessa que resolve com a resposta da solicitação Axios.
 */
export async function updateCarroByUser(carroId, body) {
    const token = localStorage.getItem('token');
    console.log("\n\nDentro de updateCarroByUser:\n\n", carroId, body);
    const response = await axios.patch(`http://localhost:5000/carros/${carroId}`,body, 
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    return response;
}

export async function deleteCarroByUser (id) {
    const token = localStorage.getItem('token');
    console.log("\n\nDentro de deleteCarroByUser:\n\n");
    const response = await axios.delete(`http://localhost:5000/carros/${id}`, 
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    return response;
};