import axios from "axios";
import format from 'date-fns/format';

const baseURL = "http://localhost:5000";

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

export async function getAllRegistro(){
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseURL}/registro/`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return response;
} ;

export function getAllRegistroByUser(){
    const tokenGetRegistroByUser = localStorage.getItem('token');
    const response = axios.get(`${baseURL}/registro/byUser`, {
        headers: {
            Authorization: `Bearer ${tokenGetRegistroByUser}`
        },
    });
    return response;
};