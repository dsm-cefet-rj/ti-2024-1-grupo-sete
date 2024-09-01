import axios from "axios";

const baseURL = "http://localhost:5000";
const token = localStorage.getItem('token');

export function getAllCarrosByUser(){
    const response = axios.get(`${baseURL}/carros/byUser`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return response;
} 

export async function criarCarro(body) {

    if (!token) {
        throw new Error("Token não encontrado. Verifique se o usuário está autenticado.");
    }

    try {
        console.log("CRIAR CARRO AQUI", body);
        const response = await axios.post(`${baseURL}/carros`, body, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        console.log("Resposta do servidor:", response.data);
        return response.data; // Return response data if needed
    } catch (error) {
        console.error("Erro ao criar carro:", error.response ? error.response.data : error.message);
        throw error;
    }
}


