import axios from "axios";
const baseURL = "http://localhost:5000";

/**
 * Obtém todos os registros de aluguel.
 * @function getAllAluguel
 * @returns {Promise<AxiosResponse<any>>} A promessa de uma resposta Axios contendo todos os registros de aluguel.
 * @description
 * Esta função realiza uma solicitação GET para o endpoint '/aluguel' no servidor localizado em 'http://localhost:5000'.
 * Inclui um token de autenticação no cabeçalho da solicitação, que é recuperado do armazenamento local.
 * A função retorna uma promessa que resolve com a resposta da solicitação Axios.
 */
export function getAllAluguel(){
    const token = localStorage.getItem('token');
    const response = axios.get(`${baseURL}/aluguel`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return response;
};

/**
 * Obtém todos os registros de aluguel associados ao usuário atual.
 * @function getAllAluguelByUser
 * @returns {Promise<AxiosResponse<any>>} A promessa de uma resposta Axios contendo todos os registros de aluguel do usuário.
 * @description
 * Esta função realiza uma solicitação GET para o endpoint '/aluguel/byUser' no servidor localizado em 'http://localhost:5000'.
 * Inclui um token de autenticação no cabeçalho da solicitação, que é recuperado do armazenamento local.
 * A função retorna uma promessa que resolve com a resposta da solicitação Axios.
 */
export function getAllAluguelByUser(){
    const tokenGetAluguelByUser = localStorage.getItem('token');
    const response = axios.get(`${baseURL}/aluguel/byUser`, {
        headers: {
            Authorization: `Bearer ${tokenGetAluguelByUser}`
        },
    });
    return response;
};