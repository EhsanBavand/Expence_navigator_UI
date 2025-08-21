// import React, { useEffect, useState } from "react";
// import {
//   getExpenses,
//   addExpense,
//   deleteExpense,
//   getCategories,
//   addCategory,
//   deleteCategory,
//   getSubCategories,
//   addSubCategory,
//   deleteSubCategory,
// } from "../services/api";

// export default function ExpensesPage() {
//   const [expenses, setExpenses] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [form, setForm] = useState({
//     amount: "",
//     store: "",
//     category: "",
//     subCategory: "",
//     paidFor: "",
//     note: "",
//     isFixed: false,
//   });
//   const [newCategory, setNewCategory] = useState("");
//   const [newSubCategory, setNewSubCategory] = useState("");

//   useEffect(() => {
//     fetchExpenses();
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     if (form.category) fetchSubCategories(form.category);
//   }, [form.category]);

//   const fetchExpenses = async () => setExpenses(await getExpenses());
//   const fetchCategories = async () => setCategories(await getCategories());
//   const fetchSubCategories = async (categoryId) =>
//     setSubCategories(await getSubCategories(categoryId));

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleAddExpense = async (e) => {
//     e.preventDefault();
//     await addExpense(form);
//     setForm({
//       amount: "",
//       store: "",
//       category: "",
//       subCategory: "",
//       paidFor: "",
//       note: "",
//       isFixed: false,
//     });
//     fetchExpenses();
//   };

//   const handleDeleteExpense = async (id) => {
//     await deleteExpense(id);
//     fetchExpenses();
//   };

//   const handleAddCategory = async () => {
//     if (!newCategory) return;
//     await addCategory({ name: newCategory });
//     setNewCategory("");
//     fetchCategories();
//   };

//   const handleDeleteCategory = async (id) => {
//     await deleteCategory(id);
//     fetchCategories();
//   };

//   const handleAddSubCategory = async () => {
//     if (!newSubCategory || !form.category) return;

//     try {
//       const subCategoryObj = {
//         Name: newSubCategory,
//         CategoryId: form.category, // keep it as string (GUID)
//       };

//       const added = await addSubCategory(subCategoryObj);

//       console.log("Added:", added);
//       setNewSubCategory("");
//       fetchSubCategories(form.category); // refresh list
//     } catch (error) {
//       const msg = error.response?.data
//         ? JSON.stringify(error.response.data)
//         : error.message;
//       console.error("Add SubCategory failed:", msg);
//     }
//   };

//   const handleDeleteSubCategory = async (id) => {
//     await deleteSubCategory(id);
//     if (form.category) fetchSubCategories(form.category);
//   };

// return (
//   <div className="container my-4">
//     <h3 className="mb-4">Expenses</h3>

//     {/* Add Expense */}
//     <div className="row mb-4">
//       <div className="col-md-6 mb-3">
//         <div className="card p-3 h-100">
//           <h5 className="card-title mb-3">Add Expense</h5>
//           <form onSubmit={handleAddExpense}>
//             <div className="row mb-2">
//               <div className="col-sm-6 mb-2">
//                 <input
//                   type="number"
//                   className="form-control"
//                   placeholder="Amount"
//                   name="amount"
//                   value={form.amount}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="col-sm-6 mb-2">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Store / Place"
//                   name="store"
//                   value={form.store}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="row mb-2">
//               <div className="col-sm-6 mb-2">
//                 <select
//                   className="form-select"
//                   name="category"
//                   value={form.category}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">Select Category</option>
//                   {categories.map((c) => (
//                     <option key={c.id} value={c.id}>
//                       {c.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="col-sm-6 mb-2">
//                 <select
//                   className="form-select"
//                   name="subCategory"
//                   value={form.subCategory}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select SubCategory</option>
//                   {subCategories.map((sc) => (
//                     <option key={sc.id} value={sc.id}>
//                       {sc.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className="mb-2">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Paid For"
//                 name="paidFor"
//                 value={form.paidFor}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="mb-2">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Note"
//                 name="note"
//                 value={form.note}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="form-check mb-2">
//               <input
//                 type="checkbox"
//                 className="form-check-input"
//                 name="isFixed"
//                 checked={form.isFixed}
//                 onChange={handleChange}
//               />
//               <label className="form-check-label">Copy to next month</label>
//             </div>

//             <button type="submit" className="btn btn-primary w-100">
//               Save Expense
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Manage Categories & SubCategories */}
//       <div className="col-md-6 mb-3">
//         <div className="card p-3 h-100">
//           <h5 className="card-title mb-3">Manage Categories</h5>

//           {/* Categories */}
//           <h6>Categories</h6>
//           <div className="d-flex mb-2">
//             <input
//               className="form-control me-2"
//               placeholder="New Category"
//               value={newCategory}
//               onChange={(e) => setNewCategory(e.target.value)}
//             />
//             <button className="btn btn-success" onClick={handleAddCategory}>
//               Add
//             </button>
//           </div>
//           {categories.map((c) => (
//             <div
//               key={c.id}
//               className="d-flex justify-content-between align-items-center border p-1 mb-1"
//             >
//               <span>{c.name}</span>
//               <button
//                 className="btn btn-danger btn-sm"
//                 onClick={() => handleDeleteCategory(c.id)}
//               >
//                 🗑
//               </button>
//             </div>
//           ))}

//           <br />
//           {/* SubCategories */}
//           <h6>Sub Categories</h6>
//           <div className="mb-2">
//             <select
//               className="form-select mb-2"
//               value={form.category}
//               onChange={handleChange}
//               name="category"
//             >
//               <option value="">Select Category</option>
//               {categories.map((c) => (
//                 <option key={c.id} value={c.id}>
//                   {c.name}
//                 </option>
//               ))}
//             </select>
//             <div className="d-flex">
//               <input
//                 className="form-control me-2"
//                 placeholder="New SubCategory"
//                 value={newSubCategory}
//                 onChange={(e) => setNewSubCategory(e.target.value)}
//               />
//               <button
//                 className="btn btn-success"
//                 onClick={handleAddSubCategory}
//               >
//                 Add
//               </button>
//             </div>
//           </div>

//           {subCategories.map((sc) => (
//             <div
//               key={sc.id}
//               className="d-flex justify-content-between align-items-center border p-1 mb-1"
//             >
//               <span>{sc.name}</span>
//               <button
//                 className="btn btn-danger btn-sm"
//                 onClick={() => handleDeleteSubCategory(sc.id)}
//               >
//                 🗑
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>

//     {/* Desktop Table */}
//     <div className="d-none d-md-block table-responsive">
//       <table className="table table-striped table-bordered">
//         <thead className="table-dark">
//           <tr>
//             <th>Date</th>
//             <th>Store</th>
//             <th>Category</th>
//             <th>SubCategory</th>
//             <th>Amount</th>
//             <th>PaidFor</th>
//             <th>Note</th>
//             <th>Fixed</th>
//             <th>✎</th>
//             <th>🗑</th>
//           </tr>
//         </thead>
//         <tbody>
//           {expenses.length === 0 ? (
//             <tr>
//               <td colSpan="10" className="text-center">
//                 No expenses yet
//               </td>
//             </tr>
//           ) : (
//             expenses.map((exp) => (
//               <tr key={exp.id}>
//                 <td>{new Date(exp.date).toLocaleDateString()}</td>
//                 <td>{exp.store}</td>
//                 <td>{exp.categoryName}</td>
//                 <td>{exp.subCategoryName}</td>
//                 <td>${exp.amount}</td>
//                 <td>{exp.paidFor}</td>
//                 <td>{exp.note}</td>
//                 <td>{exp.isFixed ? "Yes" : "No"}</td>
//                 <td>✎</td>
//                 <td>
//                   <button
//                     className="btn btn-danger btn-sm"
//                     onClick={() => handleDeleteExpense(exp.id)}
//                   >
//                     🗑
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>

//     {/* Mobile Cards */}
//     <div className="d-md-none">
//       {expenses.length === 0 ? (
//         <p className="text-center">No expenses yet</p>
//       ) : (
//         expenses.map((exp) => (
//           <div key={exp.id} className="card mb-3">
//             <div className="card-body">
//               <p>
//                 <strong>Date:</strong> {new Date(exp.date).toLocaleDateString()}
//               </p>
//               <p>
//                 <strong>Store:</strong> {exp.store}
//               </p>
//               <p>
//                 <strong>Category:</strong> {exp.categoryName}
//               </p>
//               <p>
//                 <strong>SubCategory:</strong> {exp.subCategoryName}
//               </p>
//               <p>
//                 <strong>Amount:</strong> ${exp.amount}
//               </p>
//               <p>
//                 <strong>Paid For:</strong> {exp.paidFor}
//               </p>
//               <p>
//                 <strong>Note:</strong> {exp.note}
//               </p>
//               <p>
//                 <strong>Fixed:</strong> {exp.isFixed ? "Yes" : "No"}
//               </p>
//               <div className="d-flex justify-content-end">
//                 <button
//                   className="btn btn-danger btn-sm"
//                   onClick={() => handleDeleteExpense(exp.id)}
//                 >
//                   🗑
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   </div>
// );
// }

/* Forth Part */
/*
import React, { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  deleteCategory,
  getSubCategories,
  createSubCategory,
  deleteSubCategory,
} from "../services/api";

const Expense = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Mock Expense Data
  const [expenses, setExpenses] = useState([
    { id: 1, name: "Groceries", amount: 120, date: "2025-08-21" },
    { id: 2, name: "Fuel", amount: 50, date: "2025-08-20" },
    { id: 3, name: "Electricity Bill", amount: 80, date: "2025-08-18" },
  ]);

  // Load data
  const fetchData = async () => {
    const catRes = await getCategories();
    setCategories(catRes.data);
    const subCatRes = await getSubCategories();
    setSubCategories(subCatRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handlers
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!categoryName) return;
    await createCategory({ name: categoryName });
    setCategoryName("");
    fetchData();
  };

  const handleAddSubCategory = async (e) => {
    e.preventDefault();
    if (!subCategoryName || !selectedCategory) return;
    await createSubCategory({
      name: subCategoryName,
      categoryId: selectedCategory,
    });
    setSubCategoryName("");
    fetchData();
  };

  const handleDeleteCategory = async (id) => {
    await deleteCategory(id);
    fetchData();
  };

  const handleDeleteSubCategory = async (id) => {
    await deleteSubCategory(id);
    fetchData();
  };

  return (
    <div className="container my-4">
      <div className="row g-3">
        // //Left Card: Category & SubCategory Form 
        <div className="col-lg-4 col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-header bg-primary text-white">
              Category & SubCategory
            </div>
            <div className="card-body">
              //  Category Form 
              <form onSubmit={handleAddCategory}>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Category"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-3">
                  Add Category
                </button>
              </form>

              //  SubCategory Form 
              <form onSubmit={handleAddSubCategory}>
                <div className="mb-3">
                  <label className="form-label">SubCategory</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter SubCategory"
                    value={subCategoryName}
                    onChange={(e) => setSubCategoryName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Select Category</label>
                  <select
                    className="form-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">-- Select --</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Add SubCategory
                </button>
              </form>
            </div>
          </div>
        </div>

        //  Right Card: Expense Form 
        <div className="col-lg-8 col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-header bg-success text-white">
              Expense Item (Mock Data Only)
            </div>
            <div className="card-body">
              <form onSubmit={handleAddExpense}>
                <div className="row mb-2">
                  <div className="col-sm-6 mb-2">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Amount"
                      name="amount"
                      value={form.amount}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-sm-6 mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Store / Place"
                      name="store"
                      value={form.store}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-sm-6 mb-2">
                    <select
                      className="form-select"
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-sm-6 mb-2">
                    <select
                      className="form-select"
                      name="subCategory"
                      value={form.subCategory}
                      onChange={handleChange}
                    >
                      <option value="">Select SubCategory</option>
                      {subCategories.map((sc) => (
                        <option key={sc.id} value={sc.id}>
                          {sc.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Paid For"
                    name="paidFor"
                    value={form.paidFor}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Note"
                    name="note"
                    value={form.note}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-check mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="isFixed"
                    checked={form.isFixed}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Copy to next month</label>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Save Expense
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      //  Row 2: Expense Table 
      <div className="row g-3 mt-3">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-warning text-dark">Expense List</div>
            <div className="card-body">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Expense Name</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((exp) => (
                    <tr key={exp.id}>
                      <td>{exp.name}</td>
                      <td>${exp.amount}</td>
                      <td>{exp.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      //  Row 3: Category & SubCategory Table 
      <div className="row g-3 mt-3">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-info text-white">
              Category & SubCategory List
            </div>
            <div className="card-body">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>SubCategory</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {subCategories.map((sub) => (
                    <tr key={sub.id}>
                      <td>
                        {categories.find((c) => c.id === sub.categoryId)
                          ?.name || "—"}
                      </td>
                      <td>{sub.name}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteSubCategory(sub.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {categories.map((cat) => (
                    <tr key={cat.id}>
                      <td>{cat.name}</td>
                      <td>—</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteCategory(cat.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {categories.length === 0 && subCategories.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center">
                        No categories or subcategories added yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expense;
*/

// import React, { useEffect, useState } from "react";

// import {
//   getCategories,
//   createCategory,
//   deleteCategory,
//   getSubCategories,
//   createSubCategory,
//   deleteSubCategory,
//   getExpenses,
//   addExpense,
//   deleteExpense,
// } from "../services/api";

// const Expense = () => {
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [expenses, setExpenses] = useState([]);

//   const [categoryName, setCategoryName] = useState("");
//   const [subCategoryName, setSubCategoryName] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [form, setForm] = useState({
//     amount: "",
//     store: "",
//     category: "",
//     subCategory: "",
//     paidFor: "",
//     note: "",
//     isFixed: false,
//   });

//   const [expenseForm, setExpenseForm] = useState({
//     store: "",
//     paidFor: "",
//     category: "",
//     subCategory: "",
//     amount: "",
//     note: "",
//     isFixed: false,
//     date: new Date().toISOString().split("T")[0],
//   });

//   const fetchData = async () => {
//     setCategories((await getCategories()).data);
//     setSubCategories((await getSubCategories()).data);
//     setExpenses((await getExpenses()).data);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Category/SubCategory handlers
//   const handleAddCategory = async () => {
//     if (!categoryName) return;
//     await createCategory({ name: categoryName });
//     setCategoryName("");
//     fetchData();
//   };
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleDeleteCategory = async (id) => {
//     await deleteCategory(id);
//     fetchData();
//   };

//   const handleAddSubCategory = async () => {
//     if (!subCategoryName || !selectedCategory) return;
//     await createSubCategory({
//       name: subCategoryName,
//       categoryId: selectedCategory,
//     });
//     setSubCategoryName("");
//     fetchData();
//   };

//   const handleDeleteSubCategory = async (id) => {
//     await deleteSubCategory(id);
//     fetchData();
//   };

//   // Expense handlers
//   const handleExpenseChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setExpenseForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleAddExpense = async (e) => {
//     e.preventDefault();
//     await addExpense(expenseForm);
//     setExpenseForm({
//       store: "",
//       paidFor: "",
//       category: "",
//       subCategory: "",
//       amount: "",
//       note: "",
//       isFixed: false,
//       date: new Date().toISOString().split("T")[0],
//     });
//     fetchData();
//   };

//   const handleDeleteExpense = async (id) => {
//     await deleteExpense(id);
//     fetchData();
//   };

//   return (
//     <div className="container my-4">
//       <div className="row g-3">
//         {/* Left Card: Category & SubCategory Form */}
//         <div className="col-12 col-md-6 col-lg-4">
//           <div className="card h-100 shadow-sm">
//             <div className="card-header bg-primary text-white">
//               Category & SubCategory
//             </div>
//             <div className="card-body">
//               {/* Category Form */}
//               <form onSubmit={handleAddCategory}>
//                 <div className="mb-2">
//                   <label className="form-label">Category</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter Category"
//                     value={categoryName}
//                     onChange={(e) => setCategoryName(e.target.value)}
//                   />
//                 </div>
//                 <button type="submit" className="btn btn-primary w-100 mb-3">
//                   Add Category
//                 </button>
//               </form>

//               {/* SubCategory Form */}
//               <form onSubmit={handleAddSubCategory}>
//                 <div className="mb-2">
//                   <label className="form-label">SubCategory</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter SubCategory"
//                     value={subCategoryName}
//                     onChange={(e) => setSubCategoryName(e.target.value)}
//                   />
//                 </div>
//                 <div className="mb-2">
//                   <label className="form-label">Select Category</label>
//                   <select
//                     className="form-select"
//                     value={selectedCategory}
//                     onChange={(e) => setSelectedCategory(e.target.value)}
//                   >
//                     <option value="">-- Select --</option>
//                     {categories.map((cat) => (
//                       <option key={cat.id} value={cat.id}>
//                         {cat.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <button type="submit" className="btn btn-primary w-100">
//                   Add SubCategory
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>

//         {/* Right Card: Expense Form */}
//         <div className="col-12 col-md-6 col-lg-8">
//           <div className="card h-100 shadow-sm">
//             <div className="card-header bg-success text-white">
//               Expense Item
//             </div>
//             <div className="card-body">
//               <form onSubmit={handleAddExpense}>
//                 <div className="row g-2">
//                   <div className="col-12 col-sm-6">
//                     <input
//                       type="number"
//                       className="form-control"
//                       placeholder="Amount"
//                       name="amount"
//                       value={form.amount}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="col-12 col-sm-6">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Store / Place"
//                       name="store"
//                       value={form.store}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="row g-2 mt-2">
//                   <div className="col-12 col-sm-6">
//                     <select
//                       className="form-select"
//                       name="category"
//                       value={form.category}
//                       onChange={handleChange}
//                       required
//                     >
//                       <option value="">Select Category</option>
//                       {categories.map((c) => (
//                         <option key={c.id} value={c.id}>
//                           {c.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="col-12 col-sm-6">
//                     <select
//                       className="form-select"
//                       name="subCategory"
//                       value={form.subCategory}
//                       onChange={handleChange}
//                     >
//                       <option value="">Select SubCategory</option>
//                       {subCategories.map((sc) => (
//                         <option key={sc.id} value={sc.id}>
//                           {sc.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div className="mt-2">
//                   <input
//                     type="text"
//                     className="form-control mb-2"
//                     placeholder="Paid For"
//                     name="paidFor"
//                     value={form.paidFor}
//                     onChange={handleChange}
//                     required
//                   />
//                   <input
//                     type="text"
//                     className="form-control mb-2"
//                     placeholder="Note"
//                     name="note"
//                     value={form.note}
//                     onChange={handleChange}
//                   />
//                   <div className="form-check mb-2">
//                     <input
//                       type="checkbox"
//                       className="form-check-input"
//                       name="isFixed"
//                       checked={form.isFixed}
//                       onChange={handleChange}
//                     />
//                     <label className="form-check-label">
//                       Copy to next month
//                     </label>
//                   </div>
//                   <button type="submit" className="btn btn-primary w-100">
//                     Save Expense
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Expense Table */}
//       <div className="row g-3 mt-3">
//         <div className="col-12">
//           <div className="card shadow-sm">
//             <div className="card-header bg-warning text-dark">Expense List</div>
//             <div className="card-body table-responsive">
//               <table className="table table-bordered table-striped table-hover">
//                 <thead>
//                   <tr>
//                     <th>Expense Name</th>
//                     <th>Amount</th>
//                     <th>Date</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {expenses.map((exp) => (
//                     <tr key={exp.id}>
//                       <td>{exp.name}</td>
//                       <td>${exp.amount}</td>
//                       <td>{new Date(exp.date).toLocaleDateString()}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Category & SubCategory Table */}
//       <div className="row g-3 mt-3">
//         <div className="col-12">
//           <div className="card shadow-sm">
//             <div className="card-header bg-info text-white">
//               Category & SubCategory List
//             </div>
//             <div className="card-body table-responsive">
//               <table className="table table-bordered table-striped table-hover">
//                 <thead>
//                   <tr>
//                     <th>Category</th>
//                     <th>SubCategory</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {subCategories.map((sub) => (
//                     <tr key={sub.id}>
//                       <td>
//                         {categories.find((c) => c.id === sub.categoryId)
//                           ?.name || "—"}
//                       </td>
//                       <td>{sub.name}</td>
//                       <td>
//                         <button
//                           className="btn btn-sm btn-danger"
//                           onClick={() => handleDeleteSubCategory(sub.id)}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                   {categories.map((cat) => (
//                     <tr key={cat.id}>
//                       <td>{cat.name}</td>
//                       <td>—</td>
//                       <td>
//                         <button
//                           className="btn btn-sm btn-danger"
//                           onClick={() => handleDeleteCategory(cat.id)}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                   {categories.length === 0 && subCategories.length === 0 && (
//                     <tr>
//                       <td colSpan="3" className="text-center">
//                         No categories or subcategories added yet
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Expense;

import React, { useState, useEffect } from "react";
import {
  getCategories,
  createCategory,
  deleteCategory,
  getSubCategories,
  createSubCategory,
  deleteSubCategory,
  addExpense,
  getExpenses,
} from "../services/api";

const ExpensesPage = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [form, setForm] = useState({
    amount: "",
    store: "",
    category: "",
    subCategory: "",
    paidFor: "",
    note: "",
    isFixed: false,
  });

  useEffect(() => {
    loadCategories();
    loadSubCategories();
    loadExpenses();
  }, []);

  const loadCategories = async () => {
    const res = await getCategories();
    setCategories(res.data || []);
  };

  const loadSubCategories = async () => {
    const res = await getSubCategories();
    setSubCategories(res.data || []);
  };

  const loadExpenses = async () => {
    const res = await getExpenses();
    setExpenses(res.data || []);
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!categoryName) return;
    await createCategory({ name: categoryName });
    setCategoryName("");
    loadCategories();
  };

  const handleAddSubCategory = async (e) => {
    e.preventDefault();

    if (!subCategoryName || !selectedCategory) {
      alert("Please enter a subcategory name and select a category.");
      return;
    }

    try {
      const payload = {
        name: subCategoryName,
        categoryId: selectedCategory, // Make sure this is the GUID or ID of the category
      };

      const newSubCategory = await createSubCategory(payload); // call your API
      setSubCategories((prev) => [...prev, newSubCategory.data]); // update local state
      setSubCategoryName(""); // reset input
      setSelectedCategory(""); // reset dropdown
    } catch (error) {
      console.error("Error adding subcategory:", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    await deleteCategory(id);
    loadCategories();
    loadSubCategories();
  };

  const handleDeleteSubCategory = async (id) => {
    await deleteSubCategory(id);
    loadSubCategories();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    await addExpense(form);
    setForm({
      amount: "",
      store: "",
      category: "",
      subCategory: "",
      paidFor: "",
      note: "",
      isFixed: false,
    });
    loadExpenses();
  };

  return (
    <div className="container my-4">
      <div className="row g-3">
        {/* Left Card: Category & SubCategory Form */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm">
            <div className="card-header bg-primary text-white">
              Category & SubCategory
            </div>
            <div className="card-body">
              {/* Category Form */}
              <form onSubmit={handleAddCategory}>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Category"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-3">
                  Add Category
                </button>
              </form>

              {/* SubCategory Form */}
              <form onSubmit={handleAddSubCategory}>
                <div className="mb-3">
                  <label className="form-label">SubCategory</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter SubCategory"
                    value={subCategoryName}
                    onChange={(e) => setSubCategoryName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Select Category</label>
                  <select
                    className="form-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">-- Select --</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Add SubCategory
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Card: Expense Form */}
        <div className="col-12 col-md-6 col-lg-8">
          <div className="card h-100 shadow-sm">
            <div className="card-header bg-success text-white">
              Expense Item
            </div>
            <div className="card-body">
              <form onSubmit={handleAddExpense}>
                <div className="row g-2">
                  <div className="col-12 col-sm-6">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Amount"
                      name="amount"
                      value={form.amount}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Store / Place"
                      name="store"
                      value={form.store}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row g-2 mt-2">
                  <div className="col-12 col-sm-6">
                    <select
                      className="form-select"
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12 col-sm-6">
                    <select
                      className="form-select"
                      name="subCategory"
                      value={form.subCategory}
                      onChange={handleChange}
                    >
                      <option value="">Select SubCategory</option>
                      {subCategories
                        .filter((sc) => sc.categoryId === form.category)
                        .map((sc) => (
                          <option key={sc.id} value={sc.name}>
                            {sc.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="mt-2">
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Paid For"
                    name="paidFor"
                    value={form.paidFor}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Note"
                    name="note"
                    value={form.note}
                    onChange={handleChange}
                  />
                  <div className="form-check mb-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="isFixed"
                      checked={form.isFixed}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">
                      Copy to next month
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Save Expense
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Expense Table */}
      <div className="row g-3 mt-3">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-warning text-dark">Expense List</div>
            <div className="card-body">
              {expenses.length === 0 ? (
                <p className="text-center">No expenses added yet</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Amount</th>
                        <th>Store</th>
                        <th>Category</th>
                        <th>SubCategory</th>
                        <th>Paid For</th>
                        <th>Note</th>
                        <th>Fixed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expenses.map((exp) => (
                        <tr key={exp.id}>
                          <td>${exp.amount}</td>
                          <td>{exp.store}</td>
                          <td>{exp.category}</td>
                          <td>{exp.subCategory}</td>
                          <td>{exp.paidFor}</td>
                          <td>{exp.note}</td>
                          <td>{exp.isFixed ? "Yes" : "No"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="row g-3 mt-3">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-info text-white">
              Category & SubCategory List
            </div>
            <div className="card-body">
              {categories.length === 0 && subCategories.length === 0 ? (
                <p className="text-center">
                  No categories or subcategories added yet
                </p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>SubCategory</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subCategories.map((sub) => (
                        <tr key={sub.id}>
                          <td>
                            {categories.find((c) => c.id === sub.categoryId)
                              ?.name || "—"}
                          </td>
                          <td>{sub.name}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDeleteSubCategory(sub.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                      {categories.map((cat) => (
                        <tr key={cat.id}>
                          <td>{cat.name}</td>
                          <td>—</td>
                          <td>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDeleteCategory(cat.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensesPage;
