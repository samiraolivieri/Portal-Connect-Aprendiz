import axios from 'axios';

// Configuração base da sua API
const api = axios.create({
  baseURL: 'http://localhost:5000', 
});

export const agendarVisita = async (dadosVisita) => {
  try {
    const response = await api.post('/visitas', dadosVisita);
    return response.data;
  } catch (error) {
    console.error("Erro ao agendar visita:", error);
    throw error;
  }
};