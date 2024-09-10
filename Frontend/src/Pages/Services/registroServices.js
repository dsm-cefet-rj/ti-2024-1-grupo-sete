import axios from "axios";
import format from 'date-fns/format';
const baseURL = "http://localhost:5000";

/**
 * Cria um novo registro no servidor.
 * @async
 * @function createRegistro
 * @param {Object} body - O corpo da solicitação, contendo os dados do registro a ser criado.
 * @param {string} id - O ID associado ao registro.
 * @returns {Promise<Object>} A promessa que resolve com a resposta do servidor.
 * @description
 * Esta função realiza uma solicitação POST para o endpoint '/registro/${id}' no servidor localizado em `http://localhost:5000`.
 * Inclui um token de autenticação no cabeçalho da solicitação, que é recuperado do armazenamento local.
 * A função retorna uma promessa que resolve com os dados da resposta do servidor.
 * Em caso de erro, o erro é registrado no console e a exceção é lançada.
 */
export async function createRegistro(body, id) {
    try {
        console.log("CRIAR REGISTRO AQUI", body, body.id);
        
        const tokenCria = localStorage.getItem('token');
        const response = await axios.post(`${baseURL}/registro/${id}`, body, {
            headers: {
                Authorization: `Bearer ${tokenCria}`
            },
        });
        console.log("Resposta do servidor:", response.data);
        return response.data; // Return response data if needed
    } catch (error) {
        console.error("Erro ao criar registro:", error.response ? error.response.data : error.message);
        throw error;
    }
}

/**
 * Obtém todos os registros do servidor.
 * @async
 * @function getAllRegistro
 * @returns {Promise<AxiosResponse<any>>} A promessa de uma resposta Axios contendo todos os registros.
 * @description
 * Esta função realiza uma solicitação GET para o endpoint '/registro/' no servidor localizado em 'http://localhost:5000'.
 * Inclui um token de autenticação no cabeçalho da solicitação, que é recuperado do armazenamento local.
 * A função retorna uma promessa que resolve com a resposta da solicitação Axios.
 */
export async function getAllRegistro(){
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseURL}/registro/`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return response;
} ;

/**
 * Obtém todos os registros associados ao usuário atual.
 * @function getAllRegistroByUser
 * @returns {Promise<AxiosResponse<any>>} A promessa de uma resposta Axios contendo os registros do usuário.
 * @description
 * Esta função realiza uma solicitação GET para o endpoint '/registro/byUser' no servidor localizado em 'http://localhost:5000'.
 * Inclui um token de autenticação no cabeçalho da solicitação, que é recuperado do armazenamento local.
 * A função retorna uma promessa que resolve com a resposta da solicitação Axios.
 */

export function getAllRegistroByUser(){
    const tokenGetRegistroByUser = localStorage.getItem('token');
    const response = axios.get(`${baseURL}/registro/byUser`, {
        headers: {
            Authorization: `Bearer ${tokenGetRegistroByUser}`
        },
    });
    return response;
};