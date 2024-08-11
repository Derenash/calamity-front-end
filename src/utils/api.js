import axios from 'axios';
import config from '../config';

const api = axios.create({
  baseURL: config.API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (username, password) => {
  const response = await api.post('auth/login', { username, password });
  return response.data.token;
};

export const fetchPlayers = async (auctionId) => {
  const response = await api.get(`/players/${auctionId}`);
  return response.data;
};

export const fetchCaptains = async (auctionId) => {
  const response = await api.get(`/players/${auctionId}/captains`);
  return response.data;
};

export const fetchTransaction = async (auctionId) => {
  const response = await api.get(`/players/${auctionId}/transactions`);
  return response.data;
}

export const buyPlayer = async (auctionId, playerId, playerPrice, ownerUsername) => {
  const response = await api.post(`/players/${auctionId}/buy/${playerId}`, {
    price: playerPrice,
    ownerUsername: ownerUsername
  });
  return response.data;
};


export default api;
