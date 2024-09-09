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

export function getAllAluguelByUser(){
    const tokenGetAluguelByUser = localStorage.getItem('token');
    const response = axios.get(`${baseURL}/aluguel/byUser`, {
        headers: {
            Authorization: `Bearer ${tokenGetAluguelByUser}`
        },
    });
    return response;
};