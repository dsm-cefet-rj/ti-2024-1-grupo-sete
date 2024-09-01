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

export async function criarCarro(body){
    const response = await axios.post(`${baseURL}/carros`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    console.log("CRIAR CARRO AQUI", body);
    return response;
} 