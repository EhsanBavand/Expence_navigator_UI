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

// // Categories
// export const getCategories = () =>
//   axios.get(`${API_BASE_URL}/Category/categories`);
// export const createCategory = (category) =>
//   axios.post(`${API_BASE_URL}/Category/categories`, category);
// export const updateCategory = (id, category) => {
//   console.log("Sending update request for category:", category);
//   return axios.put(`${API_BASE_URL}/Category/categories/${id}`, category);
// };
// export const deleteCategory = (id) =>
//   axios.delete(`${API_BASE_URL}/Category/categories/${id}`);

// // SubCategories
// export const getSubCategories = () =>
//   axios.get(`${API_BASE_URL}/Category/subcategories`);
// export const createSubCategory = (subcategory) =>
//   axios.post(`${API_BASE_URL}/Category/subcategories`, subcategory);
// export const updateSubCategory = async (id, subcategory) => {
//   console.log("📤 Sending update request for subcategory:", subcategory);
//   try {
//     const response = await axios.put(
//       `${API_BASE_URL}/Category/subcategories/${id}`,
//       subcategory
//     );
//     console.log("✅ Update successful:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("❌ Error updating subcategory:", error);
//     throw error;
//   }
// };
// export const deleteSubCategory = (id) =>
//   axios.delete(`${API_BASE_URL}/Category/subcategories/${id}`);

// =====================
// Categories
// =====================

// Get all categories for a specific user

export const getCategories = (userId) =>
  axios.get(`${API_BASE_URL}/Category`, { params: { userId } });

// Create a new category
export const createCategory = (category) =>
  axios.post(`${API_BASE_URL}/Category`, category);

// Update an existing category
export const updateCategory = (id, category) => {
  console.log("📤 Sending update request for category:", category);
  return axios.put(`${API_BASE_URL}/Category/${id}`, category);
};

// Delete a category
export const deleteCategory = (id) =>
  axios.delete(`${API_BASE_URL}/Category/${id}`);

// =====================
// SubCategories
// =====================

// Get all subcategories
export const getSubCategories = () => axios.get(`${API_BASE_URL}/SubCategory`);

// Get subcategories by category ID
export const getSubCategoriesByCategory = (categoryId) =>
  axios.get(`${API_BASE_URL}/SubCategory/by-category/${categoryId}`);

// Create a new subcategory
export const createSubCategory = (subcategory) =>
  axios.post(`${API_BASE_URL}/SubCategory`, subcategory);

// Update an existing subcategory
export const updateSubCategory = async (id, subcategory) => {
  console.log("📤 Sending update request for subcategory:", subcategory);
  try {
    const response = await axios.put(
      `${API_BASE_URL}/SubCategory/${id}`,
      subcategory
    );
    console.log("✅ Update successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error updating subcategory:", error);
    throw error;
  }
};

// Delete a subcategory
export const deleteSubCategory = (id) =>
  axios.delete(`${API_BASE_URL}/SubCategory/${id}`);

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

// =====================
// Places
// =====================

// ---------------- Places ----------------

// Get all places
export const getPlaces = () => axios.get(`${API_BASE_URL}/Place`);

// Create a new place
export const createPlace = (place) =>
  axios.post(`${API_BASE_URL}/Place`, place);

// Update a place
export const updatePlace = (id, place) =>
  axios.put(`${API_BASE_URL}/Place/${id}`, place);

// Delete a place
export const deletePlace = (id) => axios.delete(`${API_BASE_URL}/Place/${id}`);

// Get places for dropdown (optional: filter by category)
export const getPlacesForDropdown = (categoryId) =>
  axios.get(`${API_BASE_URL}/Place/placesdropdown`, {
    params: { categoryId },
  });
