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

// ----------------- Category API -----------------

// Get all categories for a user
export const getCategories = async (userId) => {
  const res = await axios.get(`${API_BASE_URL}/Category?userId=${userId}`);
  return res.data;
};

// Get a single category by Id
export const getCategoryById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Category/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching category ${id}:`, error);
    throw error;
  }
};

// Create a new category
export const createCategory = async (category) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Category`, category);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

// Update an existing category
export const updateCategory = async (id, category) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/Category/${id}`,
      category
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating category ${id}:`, error);
    throw error;
  }
};

// Delete a category
export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/Category/${id}`);
    return response.status === 204;
  } catch (error) {
    console.error(`Error deleting category ${id}:`, error);
    throw error;
  }
};

// =====================
// SubCategories
// =====================

// ----------------- SubCategory API -----------------
export const getSubCategoryById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}SubCategory/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching subcategory ${id}:`, error);
    throw error;
  }
};

export const getSubCategoriesByCategory = async (categoryId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}SubCategory/by-category/${categoryId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching subcategories for category ${categoryId}:`,
      error
    );
    throw error;
  }
};

export const getSubCategories = async (userId) => {
  const res = await axios.get(`${API_BASE_URL}/SubCategory?userId=${userId}`);
  return res.data;
};

export const createSubCategory = async (subCategory) => {
  const res = await axios.post(`${API_BASE_URL}/SubCategory`, subCategory);
  return res.data;
};

export const updateSubCategory = async (id, subcategory) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}SubCategory/${id}`,
      subcategory
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating subcategory ${id}:`, error);
    throw error;
  }
};

export const deleteSubCategory = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}SubCategory/${id}`);
    return response.status === 204;
  } catch (error) {
    console.error(`Error deleting subcategory ${id}:`, error);
    throw error;
  }
};

// =====================
// Places
// =====================

// ----------------- Place API -----------------
export const getPlaceById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}Place/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching place ${id}:`, error);
    throw error;
  }
};

// Places
export const getPlaces = async (userId) => {
  const res = await axios.get(`${API_BASE_URL}/Place?userId=${userId}`);
  return res.data;
};

export const createPlace = async (place) => {
  const res = await axios.post(`${API_BASE_URL}/Place`, place);
  return res.data;
};

export const updatePlace = async (id, place) => {
  try {
    const response = await axios.put(`${API_BASE_URL}Place/${id}`, place);
    return response.data;
  } catch (error) {
    console.error(`Error updating place ${id}:`, error);
    throw error;
  }
};

export const deletePlace = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}Place/${id}`);
    return response.status === 200;
  } catch (error) {
    console.error(`Error deleting place ${id}:`, error);
    throw error;
  }
};

export const getPlacesForDropdown = async (
  categoryId = null,
  subCategoryId = null
) => {
  try {
    const response = await axios.get(`${API_BASE_URL}Place/placesdropdown`, {
      params: { categoryId, subCategoryId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching places for dropdown:", error);
    throw error;
  }
};

// =====================
// Expense
// =====================

// ----------------- Expense API -----------------
export const getExpenses = async (userId) => {
  const res = await axios.get(`${API_BASE_URL}/Expense?userId=${userId}`);
  return res.data;
};

export const getExpenseById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}Expense/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching expense ${id}:`, error);
    throw error;
  }
};

export const createExpense = async (expense) => {
  try {
    const response = await axios.post(`${API_BASE_URL}Expense`, expense);
    return response.data;
  } catch (error) {
    console.error("Error creating expense:", error);
    throw error;
  }
};

export const updateExpense = async (id, expense) => {
  try {
    const response = await axios.put(`${API_BASE_URL}Expense/${id}`, expense);
    return response.data;
  } catch (error) {
    console.error(`Error updating expense ${id}:`, error);
    throw error;
  }
};

export const deleteExpense = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}Expense/${id}`);
    return response.status === 200;
  } catch (error) {
    console.error(`Error deleting expense ${id}:`, error);
    throw error;
  }
};
