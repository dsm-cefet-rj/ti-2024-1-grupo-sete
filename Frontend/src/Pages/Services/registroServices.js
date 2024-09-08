import axios from "axios";

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