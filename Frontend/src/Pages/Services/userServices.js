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

export async function updateUserByUser(userId, body) {
    const token = localStorage.getItem('token');
    console.log("\n\nDentro de updateUserByUser:\n\n", userId, body);
    const response = await axios.patch(`http://localhost:5000/user/${userId}`,body, 
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    return response;
    
}