import axios from "axios";
const baseURL = "http://localhost:5000";

/**
 * Faz uma solicitação GET para obter todos os usuários.
 * @function getAllUser
 * @returns {Promise<AxiosResponse<any>>} A promessa de uma resposta Axios contendo a lista de usuários.
 * @description
 * Esta função realiza uma solicitação GET para o endpoint '/user' do servidor localizado em 'http://localhost:5000'.
 * Ela inclui um token de autenticação no cabeçalho da solicitação, que é recuperado do armazenamento local.
 * A função retorna uma promessa que resolve com a resposta da solicitação.
 */
export function getAllUser(){
    const token = localStorage.getItem('token');
    const response = axios.get(`${baseURL}/user`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return response;
} ;