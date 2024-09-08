import axios from "axios";

const baseURL = "http://localhost:5000";

export function getAllUser(){
    const token = localStorage.getItem('token');
    const response = axios.get(`${baseURL}/user`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return response;
} ;