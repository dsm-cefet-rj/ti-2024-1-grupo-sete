import axios from "axios";

const baseURL = "http://localhost:5000";

export function getAllAluguel(){
    const token = localStorage.getItem('token');
    const response = axios.get(`${baseURL}/aluguel`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return response;
};