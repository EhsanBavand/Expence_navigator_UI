import axios from "axios";

const API_BASE_URL = "http://localhost:5283/api";

// Auth
export const login = async (credentials) => {
  return await axios.post(`${API_BASE_URL}/auth/login`, credentials);
};

export const register = async (userInfo) => {
  return await axios.post(`${API_BASE_URL}/auth/register`, userInfo);
};

// Income API
export const getIncomes = async (userId) => {
  return await axios.get(`${API_BASE_URL}/income/user/${userId}`);
};

export const getIncomesByMonth = async (userId, month, year) => {
  return await axios.get(`${API_BASE_URL}/income/by-month`, {
    params: { userId, month, year },
  });
};

export const addIncome = async (income) => {
  return await axios.post(`${API_BASE_URL}/income`, income);
};

export const updateIncome = async (income) => {
  return await axios.put(`${API_BASE_URL}/income/${income.id}`, income);
};

export const deleteIncome = async (id) => {
  return await axios.delete(`${API_BASE_URL}/income/${id}`);
};

export const duplicateIncomeNextMonth = async (id) => {
  return await axios.post(`${API_BASE_URL}/income/${id}/duplicate-next-month`);
};
