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