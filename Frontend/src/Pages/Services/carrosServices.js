import axios from "axios";

const baseURL = "http://localhost:5000";
//const token = localStorage.getItem('token');

export function getAllCarrosByUser(){
    const tokenGetCarrosByUser = localStorage.getItem('token');
    const response = axios.get(`${baseURL}/carros/byUser`, {
        headers: {
            Authorization: `Bearer ${tokenGetCarrosByUser}`
        },
    });
    return response;
};

export async function criarCarro(body) {
    const tokenCria = localStorage.getItem('token');
    if (!tokenCria) {
        throw new Error("Token não encontrado. Verifique se o usuário está autenticado.");
    }

    try {
        console.log("CRIAR CARRO AQUI", body);
        
        const response = await axios.post(`${baseURL}/carros`, body, {
            headers: {
                Authorization: `Bearer ${tokenCria}`
            },
        });
        console.log("Resposta do servidor:", response.data);
        return response.data; // Return response data if needed
    } catch (error) {
        console.error("Erro ao criar carro:", error.response ? error.response.data : error.message);
        throw error;
    }
};

export function getAllCarros(){
    const tokenAll = localStorage.getItem('token');
    console.log("\n\n\n\nGETALLCARROS TOKEN: ", tokenAll)
    const response = axios.get(`${baseURL}/carros/`, {
        headers: {
            Authorization: `Bearer ${tokenAll}`
        },
    });
    return response;
} 

export async function findCarroById(id){
    const tokenAll = localStorage.getItem('token');
    console.log("\n\nDentro de findCarroById:\n\n", `http://localhost:5000/carros/${id}`);
    console.log("\n\nTOKEN findCarroById:\n\n", tokenAll);
    const response = await axios.get(`http://localhost:5000/carros/${id}`,
    {
        headers: {
            Authorization: `Bearer ${tokenAll}`
        },
    });
    return response;
}

export async function updateDiasAlugado(id, diasAlugado) {
    const token = localStorage.getItem('token');
    console.log("\n\nDentro de updateDiasAlugado:\n\n");
    const response = await axios.patch(`http://localhost:5000/carros/diasAlugado/${id}`,{carroId: id, diasAlugadoArray: diasAlugado}, 
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    return response;
};


