import axios from "axios";

const API_BASE_URL = "http://localhost:5283/api";

// Auth
// export const login = async (credentials) => {

//   return await axios.post(`${API_BASE_URL}/auth/login`, credentials);
// };
export const login = async (credentials) => {
  console.log("Calling login API:", `${API_BASE_URL}/auth/login`);
  console.log("Credentials:", credentials);
  const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
  console.log("Login response:", response);
  return response;
};

export const register = async (userInfo) => {
  return await axios.post(`${API_BASE_URL}/auth/register`, userInfo);
};

// Income API
export const getIncomes = async (userId) => {
  return await axios.get(`${API_BASE_URL}/income/user/${userId}`);
};

export const getIncomesByMonth = (userId, month, year) => {
  return axios.get(`${API_BASE_URL}/income/by-month`, {
    params: { userId, month, year },
  });
};

// export const addIncome = async (income) => {
//   return await axios.post(`${API_BASE_URL}/income`, income);
// };

export const addIncome = async (income) => {
  return await axios.post(`${API_BASE_URL}/income`, {
    userId: income.userId,
    owner: income.owner,
    sourceType: income.sourceType,
    amount: parseFloat(income.amount),
    date: income.date,
    month: new Date(income.date).getMonth() + 1,
    year: new Date(income.date).getFullYear(),
    isRecurring: income.frequency !== "None",
    isEstimated: income.isEstimated,
    frequency: income.frequency, // <-- added
    createdBy: income.createdBy,
    createdDate: new Date().toISOString(),
    modifiedDate: new Date().toISOString(),
    description: income.description || "",
  });
};

export const updateIncome = async (income) => {
  return await axios.put(`${API_BASE_URL}/income/${income.id}`, income);
};

export const deleteIncome = async (id) => {
  return await axios.delete(`${API_BASE_URL}/income/${id}`);
};

export const duplicateIncome = async (id) => {
  return await axios.post(`${API_BASE_URL}/income/${id}/duplicate-next-month`);
};

export const addSource = async (source) => {
  return await axios.post(`${API_BASE_URL}/IncomeSource`, source);
};
export const getSources = async (userId) => {
  return await axios.get(`http://localhost:5283/api/IncomeSource/${userId}`);
};

// Update an income source
export async function updateSource(id, source) {
  try {
    const response = await axios.put(`${API_URL}/${id}`, source);
    return response.data;
  } catch (error) {
    console.error("Error updating source:", error);
    throw error;
  }
}

// Delete an income source
export async function deleteSource(id) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.status === 204; // true if deleted
  } catch (error) {
    console.error("Error deleting source:", error);
    throw error;
  }
}
