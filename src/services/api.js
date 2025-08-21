import axios from "axios";

const API_BASE_URL = "http://localhost:5283/api";

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

export const addIncome = async (income) => {
  return await axios.post(`${API_BASE_URL}/income`, {
    id: income.id, // optional: backend can generate GUID
    userId: income.userId,
    owner: income.owner,
    sourceType: income.sourceType,
    amount: parseFloat(income.amount),
    date: income.date,
    month: income.month, // ✅ use value already prepared
    year: income.year, // ✅ use value already prepared
    isRecurring: income.frequency !== "None",
    isEstimated: income.isEstimated,
    frequency: income.frequency,
    createdBy: income.createdBy,
    createdDate: new Date().toISOString(),
    modifiedDate: new Date().toISOString(),
    description: income.description || "",
  });
};

export const updateIncome = async (income) => {
  // return await axios.put(`${API_BASE_URL}/income/${income.id}`, {
  return await axios.put(`${API_BASE_URL}/income/`, {
    id: income.id,
    userId: income.userId,
    owner: income.owner,
    sourceType: income.sourceType,
    amount: parseFloat(income.amount),
    date: income.date,
    month: new Date(income.date).getMonth() + 1,
    year: new Date(income.date).getFullYear(),
    isRecurring: income.frequency !== "None",
    isEstimated: income.isEstimated,
    frequency: income.frequency,
    createdBy: income.createdBy,
    createdDate: income.createdDate,
    modifiedDate: new Date().toISOString(),
    description: income.description || "",
  });
};

export const deleteIncome = async (id) => {
  return await axios.delete(`${API_BASE_URL}/income/${id}`);
};

export const duplicateIncome = async (id) => {
  return await axios.post(`${API_BASE_URL}/income/${id}/duplicate-next-month`);
};
// ✅ New function to generate next month
export const generateNextMonth = (userId, currentMonth, currentYear) =>
  axios.post(`${API_BASE_URL}/generate-next-month`, null, {
    params: { userId, currentMonth, currentYear },
  });

/* For Source Type */
export const addSource = async (source) => {
  return await axios.post(`${API_BASE_URL}/IncomeSource`, source);
};
export const getSources = async (userId) => {
  return await axios.get(`http://localhost:5283/api/IncomeSource/${userId}`);
};
// Update source
export async function updateSource(id, source) {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/IncomeSource/${id}`,
      source
    );
    return response.data;
  } catch (error) {
    console.error("Error updating source:", error);
    throw error;
  }
}
// Delete source
export async function deleteSource(id) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/IncomeSource/${id}`);
    return response.status === 204; // true if deleted
  } catch (error) {
    console.error("Error deleting source:", error);
    throw error;
  }
}

/* Expense Page */

// -------- Expenses --------
// -------- Categories --------
// -------- SubCategories --------

// ---------------- Categories ----------------

// Categories
export const getCategories = () =>
  axios.get(`${API_BASE_URL}/Category/categories`);

export const createCategory = (category) =>
  axios.post(`${API_BASE_URL}/Category/categories`, category);
export const updateCategory = (id, category) =>
  axios.put(`${API_BASE_URL}/Category/categories/${id}`, category);
export const deleteCategory = (id) =>
  axios.delete(`${API_BASE_URL}/Category/categories/${id}`);

// SubCategories
export const getSubCategories = () =>
  axios.get(`${API_BASE_URL}/Category/subcategories`);
export const createSubCategory = (subcategory) =>
  axios.post(`${API_BASE_URL}/Category/subcategories`, subcategory);
export const updateSubCategory = (id, subcategory) =>
  axios.put(`${API_BASE_URL}/Category/subcategories/${id}`, subcategory);
export const deleteSubCategory = (id) =>
  axios.delete(`${API_BASE_URL}/Category/subcategories/${id}`);

// // ---------------- Expenses ----------------

export const addExpense = async (expense) => {
  return await axios.post(`${API_BASE_URL}/Expense`, expense);
};
export const getExpenses = async () => {
  return await axios.get(`${API_BASE_URL}/Expense`);
};

export const deleteExpense = async (id) => {
  return await axios.delete(`${API_BASE_URL}/Expense/${id}`);
};
