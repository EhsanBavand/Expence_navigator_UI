// src/services/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5283/api/auth"; // Matches your real backend

export const login = async (credentials) => {
  return await axios.post(`${API_BASE_URL}/login`, credentials);
};

export const register = async (userInfo) => {
  return await axios.post(`${API_BASE_URL}/register`, userInfo);
};
