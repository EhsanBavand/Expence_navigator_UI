// import React, { useState, useEffect } from "react";
// import { FaTrash, FaEdit, FaSave } from "react-icons/fa"; // 👈 add at top

// import {
//   getCategories,
//   createCategory,
//   deleteCategory,
//   getSubCategories,
//   createSubCategory,
//   deleteSubCategory,
//   addExpense,
//   getExpenses,
// } from "../services/api";

// const ExpensesPage = () => {
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

//   useEffect(() => {
//     loadCategories();
//     loadSubCategories();
//     loadExpenses();
//   }, []);

//   const loadCategories = async () => {
//     const res = await getCategories();
//     setCategories(res.data || []);
//   };

//   const loadSubCategories = async () => {
//     const res = await getSubCategories();
//     setSubCategories(res.data || []);
//   };

//   const loadExpenses = async () => {
//     const res = await getExpenses();
//     setExpenses(res.data || []);
//   };

//   const handleAddCategory = async (e) => {
//     e.preventDefault();
//     if (!categoryName) return;
//     await createCategory({ name: categoryName });
//     setCategoryName("");
//     loadCategories();
//   };

//   const handleAddSubCategory = async (e) => {
//     e.preventDefault();

//     if (!subCategoryName || !selectedCategory) {
//       alert("Please enter a subcategory name and select a category.");
//       return;
//     }

//     try {
//       const payload = {
//         name: subCategoryName,
//         categoryId: selectedCategory, // Make sure this is the GUID or ID of the category
//       };

//       const newSubCategory = await createSubCategory(payload); // call your API
//       setSubCategories((prev) => [...prev, newSubCategory.data]); // update local state
//       setSubCategoryName(""); // reset input
//       setSelectedCategory(""); // reset dropdown
//     } catch (error) {
//       console.error("Error adding subcategory:", error);
//     }
//   };

//   const handleDeleteCategory = async (id) => {
//     await deleteCategory(id);
//     loadCategories();
//     loadSubCategories();
//   };

//   const handleDeleteSubCategory = async (id) => {
//     await deleteSubCategory(id);
//     loadSubCategories();
//   };

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
//     loadExpenses();
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
//                 <div className="mb-3">
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
//                 <div className="mb-3">
//                   <label className="form-label">SubCategory</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter SubCategory"
//                     value={subCategoryName}
//                     onChange={(e) => setSubCategoryName(e.target.value)}
//                   />
//                 </div>
//                 <div className="mb-3">
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
//                   {/* <div className="row g-2 mt-2">
//                     <div className="col-12 col-sm-6">
//                       <select
//                         className="form-select"
//                         name="category"
//                         value={form.category}
//                         onChange={handleChange}
//                         required
//                       >
//                         <option value="">Select Category</option>
//                         {categories.map((c) => (
//                           <option key={c.id} value={c.name}>
//                             {c.name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     <div className="col-12 col-sm-6">
//                       <select
//                         className="form-select"
//                         name="category"
//                         value={form.category}
//                         onChange={handleChange}
//                         required
//                       >
//                         <option value="">Select Category</option>
//                         {categories.map((c) => (
//                           <option key={c.id} value={c.id}>
//                             {c.name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                    */}

//                   <div className="row g-2 mt-2">
//                     {/* Category Select */}
//                     <div className="col-12 col-sm-6">
//                       <select
//                         className="form-select"
//                         name="category"
//                         value={form.category}
//                         onChange={handleChange}
//                         required
//                       >
//                         <option value="">Select Category</option>
//                         {categories.map((c) => (
//                           <option key={c.id} value={c.id}>
//                             {c.name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     {/* SubCategory Select */}
//                     <div className="col-12 col-sm-6">
//                       <select
//                         className="form-select"
//                         name="subCategory"
//                         value={form.subCategory}
//                         onChange={handleChange}
//                         required
//                       >
//                         <option value="">Select Sub Category</option>
//                         {subCategories
//                           .filter((sc) => sc.categoryId === form.category) // ✅ show only subcategories for selected category
//                           .map((sc) => (
//                             <option key={sc.id} value={sc.id}>
//                               {sc.name}
//                             </option>
//                           ))}
//                       </select>
//                     </div>
//                   </div>

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
//             <div className="card-body">
//               {expenses.length === 0 ? (
//                 <p className="text-center">No expenses added yet</p>
//               ) : (
//                 <div className="table-responsive">
//                   <table className="table table-bordered table-striped table-hover">
//                     <thead>
//                       <tr>
//                         <th>Amount</th>
//                         <th>Store</th>
//                         <th>Category</th>
//                         <th>SubCategory</th>
//                         <th>Paid For</th>
//                         <th>Note</th>
//                         <th>Fixed</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {expenses.map((exp) => (
//                         <tr key={exp.id}>
//                           <td>${exp.amount}</td>
//                           <td>{exp.store}</td>
//                           <td>{exp.category}</td>
//                           <td>{exp.subCategory}</td>
//                           <td>{exp.paidFor}</td>
//                           <td>{exp.note}</td>
//                           <td>{exp.isFixed ? "Yes" : "No"}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="row g-3 mt-3">
//         <div className="col-12">
//           <div className="card shadow-sm">
//             <div className="card-header bg-info text-white">
//               Category & SubCategory List
//             </div>
//             <div className="card-body">
//               {categories.length === 0 && subCategories.length === 0 ? (
//                 <p className="text-center">
//                   No categories or subcategories added yet
//                 </p>
//               ) : (
//                 <div className="table-responsive">
//                   <table className="table table-bordered table-striped table-hover">
//                     <thead>
//                       <tr>
//                         <th>Category</th>
//                         <th>SubCategory</th>
//                         <th className="text-center">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {/* SubCategories */}
//                       {subCategories.map((sub) => (
//                         <tr key={sub.id}>
//                           <td>
//                             {categories.find((c) => c.id === sub.categoryId)
//                               ?.name || "—"}
//                           </td>
//                           <td>{sub.name}</td>
//                           <td className="text-center">
//                             <FaEdit
//                               className="text-primary me-3"
//                               style={{ cursor: "pointer" }}
//                               onClick={() =>
//                                 alert(
//                                   `Update SubCategory ${sub.name} (id: ${sub.id})`
//                                 )
//                               }
//                             />
//                             <FaTrash
//                               className="text-danger"
//                               style={{ cursor: "pointer" }}
//                               onClick={() => handleDeleteSubCategory(sub.id)}
//                             />
//                           </td>
//                         </tr>
//                       ))}

//                       {/* Categories */}
//                       {categories.map((cat) => (
//                         <tr key={cat.id}>
//                           <td>{cat.name}</td>
//                           <td>—</td>
//                           <td className="text-center">
//                             <FaEdit
//                               className="text-primary me-3"
//                               style={{ cursor: "pointer" }}
//                               onClick={() =>
//                                 alert(
//                                   `Update Category ${cat.name} (id: ${cat.id})`
//                                 )
//                               }
//                             />
//                             <FaTrash
//                               className="text-danger"
//                               style={{ cursor: "pointer" }}
//                               onClick={() => handleDeleteCategory(cat.id)}
//                             />
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExpensesPage;

// import React, { useState, useEffect } from "react";
// import { FaTrash, FaEdit } from "react-icons/fa";
// import {
//   getCategories,
//   createCategory,
//   updateCategory,
//   deleteCategory,
//   getSubCategories,
//   getSubCategoriesByCategory,
//   createSubCategory,
//   updateSubCategory,
//   deleteSubCategory,
//   getExpenses,
//   addExpense,
//   // ✅ Add these for Place
//   getPlaces,
//   createPlace,
// } from "../services/api";

// const ExpensesPage = ({ currentUserId }) => {
//   // --- States ---
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [places, setPlaces] = useState([]);
//   const [expenses, setExpenses] = useState([]);

//   // Form states
//   const [categoryName, setCategoryName] = useState("");
//   const [subCategoryName, setSubCategoryName] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");

//   const [placeName, setPlaceName] = useState("");
//   const [selectedCategoryForPlace, setSelectedCategoryForPlace] = useState("");
//   const [selectedSubCategoryForPlace, setSelectedSubCategoryForPlace] =
//     useState("");

//   const [form, setForm] = useState({
//     amount: "",
//     store: "",
//     category: "",
//     subCategory: "",
//     place: "",
//     paidFor: "",
//     note: "",
//     isFixed: false,
//   });

//   // Modals
//   const [deleteModal, setDeleteModal] = useState({
//     open: false,
//     type: "",
//     item: null,
//   });
//   const [updateModal, setUpdateModal] = useState({
//     open: false,
//     type: "",
//     item: null,
//     name: "",
//   });

//   // --- Load data ---
//   useEffect(() => {
//     loadCategories();
//     loadSubCategories();
//     loadPlaces();
//     loadExpenses();
//   }, []);

//   const loadCategories = async () => {
//     try {
//       const userId = "3385087b-7c66-4525-b55c-adc3c61dc3f8"; // replace with current logged-in user
//       const res = await getCategories(userId);
//       setCategories(res.data || []);
//     } catch (error) {
//       console.error(
//         "Failed to load categories:",
//         error.response?.data || error
//       );
//     }
//   };

//   const loadSubCategories = async () => {
//     const res = await getSubCategories();
//     setSubCategories(res.data || []);
//   };

//   const loadPlaces = async () => {
//     const res = await getPlaces();
//     setPlaces(res.data || []);
//   };

//   const loadExpenses = async () => {
//     const res = await getExpenses();
//     setExpenses(res.data || []);
//   };

//   // --- Handlers ---
//   // Category
//   const handleAddCategory = async (e) => {
//     e.preventDefault();
//     if (!categoryName) return;
//     await createCategory({ name: categoryName, userId: currentUserId });
//     setCategoryName("");
//     loadCategories();
//   };

//   // SubCategory
//   const handleAddSubCategory = async (e) => {
//     e.preventDefault();
//     if (!subCategoryName || !selectedCategory)
//       return alert("Enter SubCategory and select Category.");
//     await createSubCategory({
//       name: subCategoryName,
//       categoryId: selectedCategory,
//     });
//     setSubCategoryName("");
//     setSelectedCategory("");
//     loadSubCategories();
//   };

//   // Place
//   const handleAddPlace = async (e) => {
//     e.preventDefault();
//     if (!placeName || !selectedCategoryForPlace) return;
//     await createPlace({
//       name: placeName,
//       categoryId: selectedCategoryForPlace,
//       subCategoryId: selectedSubCategoryForPlace || null,
//       userId: currentUserId,
//     });
//     setPlaceName("");
//     setSelectedCategoryForPlace("");
//     setSelectedSubCategoryForPlace("");
//     loadPlaces();
//   };

//   // Expense
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
//       place: "",
//       paidFor: "",
//       note: "",
//       isFixed: false,
//     });
//     loadExpenses();
//   };

//   // Delete
//   const handleDelete = async () => {
//     const { type, item } = deleteModal;
//     if (type === "category") await deleteCategory(item.id);
//     if (type === "subcategory") await deleteSubCategory(item.id);
//     // Add place delete if needed
//     setDeleteModal({ open: false, type: "", item: null });
//     loadCategories();
//     loadSubCategories();
//     loadPlaces();
//   };

//   // Update
//   const handleUpdate = async () => {
//     try {
//       if (updateModal.type === "category")
//         await updateCategory(updateModal.item.id, {
//           ...updateModal.item,
//           name: updateModal.name,
//         });
//       if (updateModal.type === "subcategory")
//         await updateSubCategory(updateModal.item.id, {
//           ...updateModal.item,
//           name: updateModal.name,
//         });
//       // Place update if needed
//       setUpdateModal({ open: false, type: "", item: null, name: "" });
//       loadCategories();
//       loadSubCategories();
//       loadPlaces();
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   const handleCategoryChange = async (e) => {
//     const categoryId = e.target.value;
//     setForm((prev) => ({ ...prev, category: categoryId, subCategory: "" }));

//     if (categoryId) {
//       try {
//         const res = await getSubCategoriesByCategory(categoryId);
//         setSubCategories(res.data || []);
//       } catch (error) {
//         console.error("Failed to load subcategories:", error);
//         setSubCategories([]);
//       }
//     } else {
//       setSubCategories([]);
//     }
//   };

//   return (
//     <div className="container my-4">
//       <div className="row g-3">
//         {/* Left: Category / SubCategory / Place */}
//         <div className="col-12 col-md-6 col-lg-4">
//           <div className="card h-100 shadow-sm mb-3">
//             <div className="card-header bg-primary text-white">
//               Category & SubCategory
//             </div>
//             <div className="card-body">
//               <form onSubmit={handleAddCategory}>
//                 <input
//                   type="text"
//                   className="form-control mb-2"
//                   placeholder="Category"
//                   value={categoryName}
//                   onChange={(e) => setCategoryName(e.target.value)}
//                 />
//                 <button className="btn btn-primary w-100 mb-2">
//                   Add Category
//                 </button>
//               </form>

//               <form onSubmit={handleAddSubCategory}>
//                 <input
//                   type="text"
//                   className="form-control mb-2"
//                   placeholder="SubCategory"
//                   value={subCategoryName}
//                   onChange={(e) => setSubCategoryName(e.target.value)}
//                 />
//                 <select
//                   className="form-select mb-2"
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                 >
//                   <option value="">-- Select Category --</option>
//                   {categories.map((cat) => (
//                     <option key={cat.id} value={cat.id}>
//                       {cat.name}
//                     </option>
//                   ))}
//                 </select>
//                 <button className="btn btn-primary w-100">
//                   Add SubCategory
//                 </button>
//               </form>
//             </div>
//           </div>

//           <div className="card h-100 shadow-sm mb-3">
//             <div className="card-header bg-warning text-dark">Add Place</div>
//             <div className="card-body">
//               <form onSubmit={handleAddPlace}>
//                 <input
//                   type="text"
//                   className="form-control mb-2"
//                   placeholder="Place Name"
//                   value={placeName}
//                   onChange={(e) => setPlaceName(e.target.value)}
//                   required
//                 />
//                 <select
//                   className="form-select mb-2"
//                   value={selectedCategoryForPlace}
//                   onChange={(e) => setSelectedCategoryForPlace(e.target.value)}
//                   required
//                 >
//                   <option value="">-- Select Category --</option>
//                   {categories.map((cat) => (
//                     <option key={cat.id} value={cat.id}>
//                       {cat.name}
//                     </option>
//                   ))}
//                 </select>
//                 <select
//                   className="form-select mb-2"
//                   value={selectedSubCategoryForPlace}
//                   onChange={(e) =>
//                     setSelectedSubCategoryForPlace(e.target.value)
//                   }
//                 >
//                   <option value="">-- Select SubCategory (Optional) --</option>
//                   {subCategories
//                     .filter((sc) => sc.categoryId === selectedCategoryForPlace)
//                     .map((sc) => (
//                       <option key={sc.id} value={sc.id}>
//                         {sc.name}
//                       </option>
//                     ))}
//                 </select>
//                 <button className="btn btn-warning w-100">Add Place</button>
//               </form>
//             </div>
//           </div>
//         </div>

//         {/* Right: Expense Form */}
//         <div className="col-12 col-md-6 col-lg-8">
//           <div className="card h-100 shadow-sm">
//             <div className="card-header bg-success text-white">Add Expense</div>
//             <div className="card-body">
//               <form onSubmit={handleAddExpense}>
//                 <div className="row g-2">
//                   <div className="col-12 col-sm-6">
//                     <select
//                       className="form-select"
//                       name="category"
//                       value={form.category}
//                       onChange={handleCategoryChange}
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
//                       required
//                     >
//                       <option value="">Select Sub Category</option>
//                       {subCategories.map((sc) => (
//                         <option key={sc.id} value={sc.id}>
//                           {sc.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="col-12 col-sm-6">
//                     <select
//                       className="form-select"
//                       name="place"
//                       value={form.place}
//                       onChange={handleChange}
//                     >
//                       <option value="">Select Place</option>
//                       {places
//                         .filter((p) => p.categoryId === form.category)
//                         .map((p) => (
//                           <option key={p.id} value={p.id}>
//                             {p.name}
//                           </option>
//                         ))}
//                     </select>
//                   </div>
//                   <div className="col-12 col-sm-6">
//                     <input
//                       type="text"
//                       name="store"
//                       className="form-control"
//                       placeholder="Store"
//                       value={form.store}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="col-12 col-sm-6">
//                     <input
//                       type="number"
//                       name="amount"
//                       className="form-control"
//                       placeholder="Amount"
//                       value={form.amount}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="col-12 col-sm-6">
//                     <input
//                       type="text"
//                       name="paidFor"
//                       className="form-control"
//                       placeholder="Paid For"
//                       value={form.paidFor}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="col-12">
//                     <textarea
//                       name="note"
//                       className="form-control"
//                       placeholder="Note"
//                       value={form.note}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="col-12">
//                     <div className="form-check">
//                       <input
//                         className="form-check-input"
//                         type="checkbox"
//                         name="isFixed"
//                         checked={form.isFixed}
//                         onChange={handleChange}
//                       />
//                       <label className="form-check-label">Fixed Expense</label>
//                     </div>
//                   </div>
//                   <div className="col-12">
//                     <button type="submit" className="btn btn-success w-100">
//                       Add Expense
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Place Table */}
//       <div className="card mt-3 shadow-sm">
//         <div className="card-header bg-info text-white">Places</div>
//         <div className="card-body table-responsive">
//           <table className="table table-bordered table-striped">
//             <thead>
//               <tr>
//                 <th>Category</th>
//                 <th>SubCategory</th>
//                 <th>Place</th>
//               </tr>
//             </thead>
//             <tbody>
//               {places.map((place) => (
//                 <tr key={place.id}>
//                   <td>
//                     {categories.find((c) => c.id === place.categoryId)?.name ||
//                       "-"}
//                   </td>
//                   <td>
//                     {subCategories.find((sc) => sc.id === place.subCategoryId)
//                       ?.name || "-"}
//                   </td>
//                   <td>{place.name}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// // export default ExpensesPage;

// import React, { useState, useEffect } from "react";
// import {
//   getCategories,
//   createCategory,
//   getSubCategories,
//   createSubCategory,
//   getSubCategoriesByCategory,
//   createPlace,
//   getPlacesForDropdown,
//   addExpense,
// } from "../services/api";

// const ExpensesPage = () => {
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [places, setPlaces] = useState([]);

//   const [categoryName, setCategoryName] = useState("");
//   const [subCategoryName, setSubCategoryName] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");

//   const [placeName, setPlaceName] = useState("");
//   const [selectedCategoryForPlace, setSelectedCategoryForPlace] = useState("");
//   const [selectedSubCategoryForPlace, setSelectedSubCategoryForPlace] =
//     useState("");

//   const [form, setForm] = useState({
//     category: "",
//     subCategory: "",
//     place: "",
//     store: "",
//     amount: "",
//     paidFor: "",
//     note: "",
//     isFixed: false,
//   });

//   const userId = "3385087b-7c66-4525-b55c-adc3c61dc3f8"; // replace with logged-in userId

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const catRes = await getCategories(userId);
//         setCategories(catRes.data || []);

//         const subRes = await getSubCategories();
//         setSubCategories(subRes.data || []);

//         const placeRes = await getPlacesForDropdown();
//         setPlaces(placeRes.data || []);
//       } catch (err) {
//         console.error("Failed to load data:", err.response?.data || err);
//       }
//     };
//     loadData();
//   }, []);

//   // ===== Handlers =====
//   const handleAddCategory = async (e) => {
//     e.preventDefault();
//     if (!categoryName) return;
//     try {
//       const res = await createCategory({ name: categoryName, userId });
//       setCategories([...categories, res.data]);
//       setCategoryName("");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleAddSubCategory = async (e) => {
//     e.preventDefault();
//     if (!subCategoryName || !selectedCategory) return;
//     try {
//       const res = await createSubCategory({
//         name: subCategoryName,
//         categoryId: selectedCategory,
//       });
//       setSubCategories([...subCategories, res.data]);
//       setSubCategoryName("");
//       setSelectedCategory("");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleAddPlace = async (e) => {
//     e.preventDefault();
//     if (!placeName || !selectedCategoryForPlace) return;
//     try {
//       const res = await createPlace({
//         name: placeName,
//         userId,
//         categoryId: selectedCategoryForPlace,
//         subCategoryId: selectedSubCategoryForPlace || null,
//       });
//       setPlaces([...places, res.data]);
//       setPlaceName("");
//       setSelectedCategoryForPlace("");
//       setSelectedSubCategoryForPlace("");
//     } catch (err) {
//       console.error(err.response?.data || err);
//     }
//   };

//   const handleCategoryChange = (e) => {
//     const categoryId = e.target.value;
//     setForm({ ...form, category: categoryId, subCategory: "", place: "" });
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm({
//       ...form,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleAddExpense = async (e) => {
//     e.preventDefault();
//     try {
//       await addExpense({ ...form, userId });
//       alert("Expense added successfully!");
//       setForm({
//         category: "",
//         subCategory: "",
//         place: "",
//         store: "",
//         amount: "",
//         paidFor: "",
//         note: "",
//         isFixed: false,
//       });
//     } catch (err) {
//       console.error(err.response?.data || err);
//     }
//   };

//   return (
//     <div className="container my-4">
//       <div className="row g-3">
//         {/* Left: Category / SubCategory / Place */}
//         <div className="col-12 col-md-6 col-lg-4">
//           <div className="card h-100 shadow-sm mb-3">
//             <div className="card-header bg-primary text-white">
//               Category & SubCategory
//             </div>
//             <div className="card-body">
//               <form onSubmit={handleAddCategory}>
//                 <input
//                   type="text"
//                   className="form-control mb-2"
//                   placeholder="Category"
//                   value={categoryName}
//                   onChange={(e) => setCategoryName(e.target.value)}
//                 />
//                 <button className="btn btn-primary w-100 mb-2">
//                   Add Category
//                 </button>
//               </form>

//               <form onSubmit={handleAddSubCategory}>
//                 <input
//                   type="text"
//                   className="form-control mb-2"
//                   placeholder="SubCategory"
//                   value={subCategoryName}
//                   onChange={(e) => setSubCategoryName(e.target.value)}
//                 />
//                 <select
//                   className="form-select mb-2"
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                 >
//                   <option value="">-- Select Category --</option>
//                   {categories.map((cat) => (
//                     <option key={cat.id} value={cat.id}>
//                       {cat.name}
//                     </option>
//                   ))}
//                 </select>
//                 <button className="btn btn-primary w-100">
//                   Add SubCategory
//                 </button>
//               </form>
//             </div>
//           </div>

//           <div className="card h-100 shadow-sm mb-3">
//             <div className="card-header bg-warning text-dark">Add Place</div>
//             <div className="card-body">
//               <form onSubmit={handleAddPlace}>
//                 <input
//                   type="text"
//                   className="form-control mb-2"
//                   placeholder="Place Name"
//                   value={placeName}
//                   onChange={(e) => setPlaceName(e.target.value)}
//                   required
//                 />
//                 <select
//                   className="form-select mb-2"
//                   value={selectedCategoryForPlace}
//                   onChange={(e) => setSelectedCategoryForPlace(e.target.value)}
//                   required
//                 >
//                   <option value="">-- Select Category --</option>
//                   {categories.map((cat) => (
//                     <option key={cat.id} value={cat.id}>
//                       {cat.name}
//                     </option>
//                   ))}
//                 </select>
//                 <select
//                   className="form-select mb-2"
//                   value={selectedSubCategoryForPlace}
//                   onChange={(e) =>
//                     setSelectedSubCategoryForPlace(e.target.value)
//                   }
//                 >
//                   <option value="">-- Select SubCategory (Optional) --</option>
//                   {subCategories
//                     .filter((sc) => sc.categoryId === selectedCategoryForPlace)
//                     .map((sc) => (
//                       <option key={sc.id} value={sc.id}>
//                         {sc.name}
//                       </option>
//                     ))}
//                 </select>
//                 <button className="btn btn-warning w-100">Add Place</button>
//               </form>
//             </div>
//           </div>
//         </div>

//         {/* Right: Expense Form */}
//         <div className="col-12 col-md-6 col-lg-8">
//           <div className="card h-100 shadow-sm">
//             <div className="card-header bg-success text-white">Add Expense</div>
//             <div className="card-body">
//               <form onSubmit={handleAddExpense}>
//                 <div className="row g-2">
//                   <div className="col-12 col-sm-6">
//                     <select
//                       className="form-select"
//                       name="category"
//                       value={form.category}
//                       onChange={handleCategoryChange}
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
//                       required
//                     >
//                       <option value="">Select Sub Category</option>
//                       {subCategories
//                         .filter((sc) => sc.categoryId === form.category)
//                         .map((sc) => (
//                           <option key={sc.id} value={sc.id}>
//                             {sc.name}
//                           </option>
//                         ))}
//                     </select>
//                   </div>
//                   <div className="col-12 col-sm-6">
//                     <select
//                       className="form-select"
//                       name="place"
//                       value={form.place}
//                       onChange={handleChange}
//                     >
//                       <option value="">Select Place</option>
//                       {places
//                         .filter((p) => p.categoryId === form.category)
//                         .map((p) => (
//                           <option key={p.id} value={p.id}>
//                             {p.name}
//                           </option>
//                         ))}
//                     </select>
//                   </div>
//                   <div className="col-12 col-sm-6">
//                     <input
//                       type="text"
//                       name="store"
//                       className="form-control"
//                       placeholder="Store"
//                       value={form.store}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="col-12 col-sm-6">
//                     <input
//                       type="number"
//                       name="amount"
//                       className="form-control"
//                       placeholder="Amount"
//                       value={form.amount}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="col-12 col-sm-6">
//                     <input
//                       type="text"
//                       name="paidFor"
//                       className="form-control"
//                       placeholder="Paid For"
//                       value={form.paidFor}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="col-12">
//                     <textarea
//                       name="note"
//                       className="form-control"
//                       placeholder="Note"
//                       value={form.note}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="col-12">
//                     <div className="form-check">
//                       <input
//                         className="form-check-input"
//                         type="checkbox"
//                         name="isFixed"
//                         checked={form.isFixed}
//                         onChange={handleChange}
//                       />
//                       <label className="form-check-label">Fixed Expense</label>
//                     </div>
//                   </div>
//                   <div className="col-12">
//                     <button type="submit" className="btn btn-success w-100">
//                       Add Expense
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Place Table */}
//       {/* <div className="card mt-3 shadow-sm">
//         <div className="card-header bg-info text-white">Places</div>
//         <div className="card-body table-responsive">
//           <table className="table table-bordered table-striped">
//             <thead>
//               <tr>
//                 <th>Category</th>
//                 <th>SubCategory</th>
//                 <th>Place</th>
//               </tr>
//             </thead>
//             <tbody>
//               {places.map((place) => (
//                 <tr key={place.id}>
//                   <td>
//                     {categories.find((c) => c.id === place.categoryId)?.name ||
//                       "-"}
//                   </td>
//                   <td>
//                     {subCategories.find((sc) => sc.id === place.subCategoryId)
//                       ?.name || "-"}
//                   </td>
//                   <td>{place.name}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div> */}
//     </div>
//   );
// };

// export default ExpensesPage;

// // ----------------------------------------------
// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// export default function ExpenseManager() {
//   const [activeTab, setActiveTab] = useState("category");

//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [places, setPlaces] = useState([]);
//   const [expenses, setExpenses] = useState([]);

//   const [categoryName, setCategoryName] = useState("");
//   const [subCategoryName, setSubCategoryName] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [placeName, setPlaceName] = useState("");
//   const [selectedCategoryForPlace, setSelectedCategoryForPlace] = useState("");
//   const [selectedSubCategoryForPlace, setSelectedSubCategoryForPlace] =
//     useState("");

//   const [expenseForm, setExpenseForm] = useState({
//     category: "",
//     subCategory: "",
//     place: "",
//     store: "",
//     amount: "",
//     paidFor: "",
//     note: "",
//     isFixed: false,
//   });

//   // Handlers
//   const handleAddCategory = (e) => {
//     e.preventDefault();
//     if (!categoryName) return;
//     setCategories([...categories, { id: Date.now(), name: categoryName }]);
//     setCategoryName("");
//   };

//   const handleAddSubCategory = (e) => {
//     e.preventDefault();
//     if (!subCategoryName || !selectedCategory) return;
//     setSubCategories([
//       ...subCategories,
//       { id: Date.now(), name: subCategoryName, categoryId: selectedCategory },
//     ]);
//     setSubCategoryName("");
//     setSelectedCategory("");
//   };

//   const handleAddPlace = (e) => {
//     e.preventDefault();
//     if (!placeName || !selectedCategoryForPlace) return;
//     setPlaces([
//       ...places,
//       {
//         id: Date.now(),
//         name: placeName,
//         categoryId: selectedCategoryForPlace,
//         subCategoryId: selectedSubCategoryForPlace || null,
//       },
//     ]);
//     setPlaceName("");
//     setSelectedCategoryForPlace("");
//     setSelectedSubCategoryForPlace("");
//   };

//   const handleAddExpense = (e) => {
//     e.preventDefault();
//     if (
//       !expenseForm.category ||
//       !expenseForm.subCategory ||
//       !expenseForm.amount
//     )
//       return;
//     setExpenses([...expenses, { ...expenseForm, id: Date.now() }]);
//     setExpenseForm({
//       category: "",
//       subCategory: "",
//       place: "",
//       store: "",
//       amount: "",
//       paidFor: "",
//       note: "",
//       isFixed: false,
//     });
//   };

//   const handleExpenseChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setExpenseForm({
//       ...expenseForm,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleDelete = (id, type) => {
//     if (type === "category")
//       setCategories(categories.filter((c) => c.id !== id));
//     if (type === "subCategory")
//       setSubCategories(subCategories.filter((c) => c.id !== id));
//     if (type === "place") setPlaces(places.filter((c) => c.id !== id));
//     if (type === "expense") setExpenses(expenses.filter((c) => c.id !== id));
//   };

//   return (
//     <div className="container my-4">
//       <div className="row">
//         {/* Left Column: Category / SubCategory / Place */}
//         <div className="col-12 col-lg-4 mb-4">
//           <ul className="nav nav-tabs mb-3" role="tablist">
//             <li className="nav-item">
//               <button
//                 className={`nav-link ${
//                   activeTab === "category" ? "active" : ""
//                 }`}
//                 onClick={() => setActiveTab("category")}
//               >
//                 Category
//               </button>
//             </li>
//             <li className="nav-item">
//               <button
//                 className={`nav-link ${
//                   activeTab === "subCategory" ? "active" : ""
//                 }`}
//                 onClick={() => setActiveTab("subCategory")}
//               >
//                 SubCategory
//               </button>
//             </li>
//             <li className="nav-item">
//               <button
//                 className={`nav-link ${activeTab === "place" ? "active" : ""}`}
//                 onClick={() => setActiveTab("place")}
//               >
//                 Place
//               </button>
//             </li>
//           </ul>

//           {/* Tab Content */}
//           {activeTab === "category" && (
//             <div className="card p-3 shadow-sm">
//               <form onSubmit={handleAddCategory} className="mb-3">
//                 <input
//                   type="text"
//                   className="form-control mb-2"
//                   placeholder="Category Name"
//                   value={categoryName}
//                   onChange={(e) => setCategoryName(e.target.value)}
//                 />
//                 <button className="btn btn-primary w-100">Add Category</button>
//               </form>

//               <table className="table table-bordered table-sm mb-0">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {categories.map((cat) => (
//                     <tr key={cat.id}>
//                       <td>{cat.name}</td>
//                       <td>
//                         <button
//                           className="btn btn-sm btn-danger"
//                           onClick={() => handleDelete(cat.id, "category")}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                   {categories.length === 0 && (
//                     <tr>
//                       <td colSpan={2} className="text-center">
//                         No categories
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {activeTab === "subCategory" && (
//             <div className="card p-3 shadow-sm">
//               <form onSubmit={handleAddSubCategory} className="mb-3">
//                 <input
//                   type="text"
//                   className="form-control mb-2"
//                   placeholder="SubCategory Name"
//                   value={subCategoryName}
//                   onChange={(e) => setSubCategoryName(e.target.value)}
//                 />
//                 <select
//                   className="form-select mb-2"
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                   required
//                 >
//                   <option value="">-- Select Parent Category --</option>
//                   {categories.map((c) => (
//                     <option key={c.id} value={c.id}>
//                       {c.name}
//                     </option>
//                   ))}
//                 </select>
//                 <button className="btn btn-primary w-100">
//                   Add SubCategory
//                 </button>
//               </form>

//               <table className="table table-bordered table-sm mb-0">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Category</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {subCategories.map((sc) => (
//                     <tr key={sc.id}>
//                       <td>{sc.name}</td>
//                       <td>
//                         {categories.find((c) => c.id === sc.categoryId)?.name ||
//                           "-"}
//                       </td>
//                       <td>
//                         <button
//                           className="btn btn-sm btn-danger"
//                           onClick={() => handleDelete(sc.id, "subCategory")}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                   {subCategories.length === 0 && (
//                     <tr>
//                       <td colSpan={3} className="text-center">
//                         No subcategories
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {activeTab === "place" && (
//             <div className="card p-3 shadow-sm">
//               <form onSubmit={handleAddPlace} className="mb-3">
//                 <input
//                   type="text"
//                   className="form-control mb-2"
//                   placeholder="Place Name"
//                   value={placeName}
//                   onChange={(e) => setPlaceName(e.target.value)}
//                   required
//                 />
//                 <select
//                   className="form-select mb-2"
//                   value={selectedCategoryForPlace}
//                   onChange={(e) => setSelectedCategoryForPlace(e.target.value)}
//                   required
//                 >
//                   <option value="">-- Select Category --</option>
//                   {categories.map((c) => (
//                     <option key={c.id} value={c.id}>
//                       {c.name}
//                     </option>
//                   ))}
//                 </select>
//                 <select
//                   className="form-select mb-2"
//                   value={selectedSubCategoryForPlace}
//                   onChange={(e) =>
//                     setSelectedSubCategoryForPlace(e.target.value)
//                   }
//                 >
//                   <option value="">-- Select SubCategory (Optional) --</option>
//                   {subCategories
//                     .filter((sc) => sc.categoryId === selectedCategoryForPlace)
//                     .map((sc) => (
//                       <option key={sc.id} value={sc.id}>
//                         {sc.name}
//                       </option>
//                     ))}
//                 </select>
//                 <button className="btn btn-warning w-100">Add Place</button>
//               </form>

//               <table className="table table-bordered table-sm mb-0">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Category</th>
//                     <th>SubCategory</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {places.map((p) => (
//                     <tr key={p.id}>
//                       <td>{p.name}</td>
//                       <td>
//                         {categories.find((c) => c.id === p.categoryId)?.name ||
//                           "-"}
//                       </td>
//                       <td>
//                         {subCategories.find((sc) => sc.id === p.subCategoryId)
//                           ?.name || "-"}
//                       </td>
//                       <td>
//                         <button
//                           className="btn btn-sm btn-danger"
//                           onClick={() => handleDelete(p.id, "place")}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                   {places.length === 0 && (
//                     <tr>
//                       <td colSpan={4} className="text-center">
//                         No places
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         {/* Right Column: Expense Form & Table */}
//         <div className="col-12 col-lg-8">
//           <div className="card p-3 shadow-sm mb-4">
//             <h5 className="card-title mb-3">Add Expense</h5>
//             <form onSubmit={handleAddExpense}>
//               <div className="row g-2">
//                 <div className="col-12 col-sm-6">
//                   <select
//                     className="form-select"
//                     name="category"
//                     value={expenseForm.category}
//                     onChange={handleExpenseChange}
//                     required
//                   >
//                     <option value="">Select Category</option>
//                     {categories.map((c) => (
//                       <option key={c.id} value={c.id}>
//                         {c.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="col-12 col-sm-6">
//                   <select
//                     className="form-select"
//                     name="subCategory"
//                     value={expenseForm.subCategory}
//                     onChange={handleExpenseChange}
//                     required
//                   >
//                     <option value="">Select SubCategory</option>
//                     {subCategories
//                       .filter((sc) => sc.categoryId === expenseForm.category)
//                       .map((sc) => (
//                         <option key={sc.id} value={sc.id}>
//                           {sc.name}
//                         </option>
//                       ))}
//                   </select>
//                 </div>
//                 <div className="col-12 col-sm-6">
//                   <select
//                     className="form-select"
//                     name="place"
//                     value={expenseForm.place}
//                     onChange={handleExpenseChange}
//                   >
//                     <option value="">Select Place</option>
//                     {places
//                       .filter((p) => p.categoryId === expenseForm.category)
//                       .map((p) => (
//                         <option key={p.id} value={p.id}>
//                           {p.name}
//                         </option>
//                       ))}
//                   </select>
//                 </div>
//                 <div className="col-12 col-sm-6">
//                   <input
//                     type="text"
//                     name="store"
//                     className="form-control"
//                     placeholder="Store"
//                     value={expenseForm.store}
//                     onChange={handleExpenseChange}
//                   />
//                 </div>
//                 <div className="col-12 col-sm-6">
//                   <input
//                     type="number"
//                     name="amount"
//                     className="form-control"
//                     placeholder="Amount"
//                     value={expenseForm.amount}
//                     onChange={handleExpenseChange}
//                     required
//                   />
//                 </div>
//                 <div className="col-12 col-sm-6">
//                   <input
//                     type="text"
//                     name="paidFor"
//                     className="form-control"
//                     placeholder="Paid For"
//                     value={expenseForm.paidFor}
//                     onChange={handleExpenseChange}
//                   />
//                 </div>
//                 <div className="col-12">
//                   <textarea
//                     name="note"
//                     className="form-control"
//                     placeholder="Note"
//                     value={expenseForm.note}
//                     onChange={handleExpenseChange}
//                   />
//                 </div>
//                 <div className="col-12">
//                   <div className="form-check mb-2">
//                     <input
//                       type="checkbox"
//                       name="isFixed"
//                       className="form-check-input"
//                       checked={expenseForm.isFixed}
//                       onChange={handleExpenseChange}
//                     />
//                     <label className="form-check-label">Fixed Expense</label>
//                   </div>
//                 </div>
//                 <div className="col-12">
//                   <button className="btn btn-success w-100">Add Expense</button>
//                 </div>
//               </div>
//             </form>
//           </div>

//           {/* Expense Table */}
//           <div className="card p-3 shadow-sm">
//             <h5 className="card-title mb-3">Expenses</h5>
//             <div className="table-responsive">
//               <table className="table table-bordered table-striped table-sm mb-0">
//                 <thead>
//                   <tr>
//                     <th>Category</th>
//                     <th>SubCategory</th>
//                     <th>Place</th>
//                     <th>Store</th>
//                     <th>Amount</th>
//                     <th>Paid For</th>
//                     <th>Note</th>
//                     <th>Fixed</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {expenses.map((exp) => (
//                     <tr key={exp.id}>
//                       <td>
//                         {categories.find((c) => c.id === exp.category)?.name ||
//                           "-"}
//                       </td>
//                       <td>
//                         {subCategories.find((sc) => sc.id === exp.subCategory)
//                           ?.name || "-"}
//                       </td>
//                       <td>
//                         {places.find((p) => p.id === exp.place)?.name || "-"}
//                       </td>
//                       <td>{exp.store}</td>
//                       <td>{exp.amount}</td>
//                       <td>{exp.paidFor}</td>
//                       <td>{exp.note}</td>
//                       <td>{exp.isFixed ? "Yes" : "No"}</td>
//                       <td>
//                         <button
//                           className="btn btn-sm btn-danger"
//                           onClick={() => handleDelete(exp.id, "expense")}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                   {expenses.length === 0 && (
//                     <tr>
//                       <td colSpan={9} className="text-center">
//                         No expenses
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
// }

// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// export default function ExpenseManager() {
//   const [formTab, setFormTab] = useState("category"); // Tabs for forms
//   const [tableTab, setTableTab] = useState("category"); // Tabs for tables

//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [places, setPlaces] = useState([]);
//   const [expenses, setExpenses] = useState([]);

//   // States for forms...
//   const [categoryName, setCategoryName] = useState("");
//   const [subCategoryName, setSubCategoryName] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [placeName, setPlaceName] = useState("");
//   const [selectedCategoryForPlace, setSelectedCategoryForPlace] = useState("");
//   const [selectedSubCategoryForPlace, setSelectedSubCategoryForPlace] =
//     useState("");
//   const [expenseForm, setExpenseForm] = useState({
//     category: "",
//     subCategory: "",
//     place: "",
//     store: "",
//     amount: "",
//     paidFor: "",
//     note: "",
//     isFixed: false,
//   });

//   // Handlers...
//   const handleAddCategory = (e) => {
//     e.preventDefault();
//     if (!categoryName) return;
//     setCategories([...categories, { id: Date.now(), name: categoryName }]);
//     setCategoryName("");
//   };

//   const handleAddSubCategory = (e) => {
//     e.preventDefault();
//     if (!subCategoryName || !selectedCategory) return;
//     setSubCategories([
//       ...subCategories,
//       { id: Date.now(), name: subCategoryName, categoryId: selectedCategory },
//     ]);
//     setSubCategoryName("");
//     setSelectedCategory("");
//   };

//   const handleAddPlace = (e) => {
//     e.preventDefault();
//     if (!placeName || !selectedCategoryForPlace) return;
//     setPlaces([
//       ...places,
//       {
//         id: Date.now(),
//         name: placeName,
//         categoryId: selectedCategoryForPlace,
//         subCategoryId: selectedSubCategoryForPlace || null,
//       },
//     ]);
//     setPlaceName("");
//     setSelectedCategoryForPlace("");
//     setSelectedSubCategoryForPlace("");
//   };

//   const handleAddExpense = (e) => {
//     e.preventDefault();
//     if (
//       !expenseForm.category ||
//       !expenseForm.subCategory ||
//       !expenseForm.amount
//     )
//       return;
//     setExpenses([...expenses, { ...expenseForm, id: Date.now() }]);
//     setExpenseForm({
//       category: "",
//       subCategory: "",
//       place: "",
//       store: "",
//       amount: "",
//       paidFor: "",
//       note: "",
//       isFixed: false,
//     });
//   };

//   const handleExpenseChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setExpenseForm({
//       ...expenseForm,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleDelete = (id, type) => {
//     if (type === "category")
//       setCategories(categories.filter((c) => c.id !== id));
//     if (type === "subCategory")
//       setSubCategories(subCategories.filter((c) => c.id !== id));
//     if (type === "place") setPlaces(places.filter((c) => c.id !== id));
//     if (type === "expense") setExpenses(expenses.filter((c) => c.id !== id));
//   };

//   return (
//     <div className="container my-4">
//       <div className="row g-4">
//         {/* Card 1: Forms */}
//         <div className="col-12">
//           <div className="card shadow-sm">
//             <div className="card-header bg-primary text-white">Forms</div>
//             <div className="card-body">
//               <ul className="nav nav-tabs mb-3">
//                 {["category", "subCategory", "place", "expense"].map((tab) => (
//                   <li className="nav-item" key={tab}>
//                     <button
//                       className={`nav-link ${formTab === tab ? "active" : ""}`}
//                       onClick={() => setFormTab(tab)}
//                     >
//                       {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                     </button>
//                   </li>
//                 ))}
//               </ul>

//               {/* Category Form */}
//               {formTab === "category" && (
//                 <form onSubmit={handleAddCategory}>
//                   <input
//                     type="text"
//                     className="form-control mb-2"
//                     placeholder="Category Name"
//                     value={categoryName}
//                     onChange={(e) => setCategoryName(e.target.value)}
//                   />
//                   <button className="btn btn-primary w-100">
//                     Add Category
//                   </button>
//                 </form>
//               )}

//               {/* SubCategory Form */}
//               {formTab === "subCategory" && (
//                 <form onSubmit={handleAddSubCategory}>
//                   <input
//                     type="text"
//                     className="form-control mb-2"
//                     placeholder="SubCategory Name"
//                     value={subCategoryName}
//                     onChange={(e) => setSubCategoryName(e.target.value)}
//                   />
//                   <select
//                     className="form-select mb-2"
//                     value={selectedCategory}
//                     onChange={(e) => setSelectedCategory(e.target.value)}
//                   >
//                     <option value="">-- Select Parent Category --</option>
//                     {categories.map((c) => (
//                       <option key={c.id} value={c.id}>
//                         {c.name}
//                       </option>
//                     ))}
//                   </select>
//                   <button className="btn btn-primary w-100">
//                     Add SubCategory
//                   </button>
//                 </form>
//               )}

//               {/* Place Form */}
//               {formTab === "place" && (
//                 <form onSubmit={handleAddPlace}>
//                   <input
//                     type="text"
//                     className="form-control mb-2"
//                     placeholder="Place Name"
//                     value={placeName}
//                     onChange={(e) => setPlaceName(e.target.value)}
//                   />
//                   <select
//                     className="form-select mb-2"
//                     value={selectedCategoryForPlace}
//                     onChange={(e) =>
//                       setSelectedCategoryForPlace(e.target.value)
//                     }
//                   >
//                     <option value="">-- Select Category --</option>
//                     {categories.map((c) => (
//                       <option key={c.id} value={c.id}>
//                         {c.name}
//                       </option>
//                     ))}
//                   </select>
//                   <select
//                     className="form-select mb-2"
//                     value={selectedSubCategoryForPlace}
//                     onChange={(e) =>
//                       setSelectedSubCategoryForPlace(e.target.value)
//                     }
//                   >
//                     <option value="">
//                       -- Select SubCategory (Optional) --
//                     </option>
//                     {subCategories
//                       .filter(
//                         (sc) => sc.categoryId === selectedCategoryForPlace
//                       )
//                       .map((sc) => (
//                         <option key={sc.id} value={sc.id}>
//                           {sc.name}
//                         </option>
//                       ))}
//                   </select>
//                   <button className="btn btn-warning w-100">Add Place</button>
//                 </form>
//               )}

//               {/* Expense Form */}
//               {formTab === "expense" && (
//                 <form onSubmit={handleAddExpense}>
//                   <div className="row g-2">
//                     <div className="col-12 col-sm-6">
//                       <select
//                         className="form-select"
//                         name="category"
//                         value={expenseForm.category}
//                         onChange={handleExpenseChange}
//                         required
//                       >
//                         <option value="">Select Category</option>
//                         {categories.map((c) => (
//                           <option key={c.id} value={c.id}>
//                             {c.name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     <div className="col-12 col-sm-6">
//                       <select
//                         className="form-select"
//                         name="subCategory"
//                         value={expenseForm.subCategory}
//                         onChange={handleExpenseChange}
//                         required
//                       >
//                         <option value="">Select SubCategory</option>
//                         {subCategories
//                           .filter(
//                             (sc) => sc.categoryId === expenseForm.category
//                           )
//                           .map((sc) => (
//                             <option key={sc.id} value={sc.id}>
//                               {sc.name}
//                             </option>
//                           ))}
//                       </select>
//                     </div>
//                     <div className="col-12 col-sm-6">
//                       <select
//                         className="form-select"
//                         name="place"
//                         value={expenseForm.place}
//                         onChange={handleExpenseChange}
//                       >
//                         <option value="">Select Place</option>
//                         {places
//                           .filter((p) => p.categoryId === expenseForm.category)
//                           .map((p) => (
//                             <option key={p.id} value={p.id}>
//                               {p.name}
//                             </option>
//                           ))}
//                       </select>
//                     </div>
//                     <div className="col-12 col-sm-6">
//                       <input
//                         type="text"
//                         name="store"
//                         className="form-control"
//                         placeholder="Store"
//                         value={expenseForm.store}
//                         onChange={handleExpenseChange}
//                       />
//                     </div>
//                     <div className="col-12 col-sm-6">
//                       <input
//                         type="number"
//                         name="amount"
//                         className="form-control"
//                         placeholder="Amount"
//                         value={expenseForm.amount}
//                         onChange={handleExpenseChange}
//                         required
//                       />
//                     </div>
//                     <div className="col-12 col-sm-6">
//                       <input
//                         type="text"
//                         name="paidFor"
//                         className="form-control"
//                         placeholder="Paid For"
//                         value={expenseForm.paidFor}
//                         onChange={handleExpenseChange}
//                       />
//                     </div>
//                     <div className="col-12">
//                       <textarea
//                         name="note"
//                         className="form-control"
//                         placeholder="Note"
//                         value={expenseForm.note}
//                         onChange={handleExpenseChange}
//                       />
//                     </div>
//                     <div className="col-12">
//                       <div className="form-check mb-2">
//                         <input
//                           type="checkbox"
//                           name="isFixed"
//                           className="form-check-input"
//                           checked={expenseForm.isFixed}
//                           onChange={handleExpenseChange}
//                         />
//                         <label className="form-check-label">
//                           Fixed Expense
//                         </label>
//                       </div>
//                     </div>
//                     <div className="col-12">
//                       <button className="btn btn-success w-100">
//                         Add Expense
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Card 2: Tables */}
//         <div className="col-12">
//           <div className="card shadow-sm">
//             <div className="card-header bg-info text-white">Tables</div>
//             <div className="card-body">
//               <ul className="nav nav-tabs mb-3">
//                 {["category", "subCategory", "place", "expense"].map((tab) => (
//                   <li className="nav-item" key={tab}>
//                     <button
//                       className={`nav-link ${tableTab === tab ? "active" : ""}`}
//                       onClick={() => setTableTab(tab)}
//                     >
//                       {tab.charAt(0).toUpperCase() + tab.slice(1)} Table
//                     </button>
//                   </li>
//                 ))}
//               </ul>

//               {/* Category Table */}
//               {tableTab === "category" && (
//                 <table className="table table-bordered table-sm">
//                   <thead>
//                     <tr>
//                       <th>Name</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {categories.map((cat) => (
//                       <tr key={cat.id}>
//                         <td>{cat.name}</td>
//                         <td>
//                           <button
//                             className="btn btn-sm btn-danger"
//                             onClick={() => handleDelete(cat.id, "category")}
//                           >
//                             Delete
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                     {categories.length === 0 && (
//                       <tr>
//                         <td colSpan={2} className="text-center">
//                           No categories
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               )}

//               {/* SubCategory Table */}
//               {tableTab === "subCategory" && (
//                 <table className="table table-bordered table-sm">
//                   <thead>
//                     <tr>
//                       <th>Name</th>
//                       <th>Category</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {subCategories.map((sc) => (
//                       <tr key={sc.id}>
//                         <td>{sc.name}</td>
//                         <td>
//                           {categories.find((c) => c.id === sc.categoryId)
//                             ?.name || "-"}
//                         </td>
//                         <td>
//                           <button
//                             className="btn btn-sm btn-danger"
//                             onClick={() => handleDelete(sc.id, "subCategory")}
//                           >
//                             Delete
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                     {subCategories.length === 0 && (
//                       <tr>
//                         <td colSpan={3} className="text-center">
//                           No subcategories
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               )}

//               {/* Place Table */}
//               {tableTab === "place" && (
//                 <table className="table table-bordered table-sm">
//                   <thead>
//                     <tr>
//                       <th>Name</th>
//                       <th>Category</th>
//                       <th>SubCategory</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {places.map((p) => (
//                       <tr key={p.id}>
//                         <td>{p.name}</td>
//                         <td>
//                           {categories.find((c) => c.id === p.categoryId)
//                             ?.name || "-"}
//                         </td>
//                         <td>
//                           {subCategories.find((sc) => sc.id === p.subCategoryId)
//                             ?.name || "-"}
//                         </td>
//                         <td>
//                           <button
//                             className="btn btn-sm btn-danger"
//                             onClick={() => handleDelete(p.id, "place")}
//                           >
//                             Delete
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                     {places.length === 0 && (
//                       <tr>
//                         <td colSpan={4} className="text-center">
//                           No places
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               )}

//               {/* Expense Table */}
//               {tableTab === "expense" && (
//                 <table className="table table-bordered table-sm">
//                   <thead>
//                     <tr>
//                       <th>Category</th>
//                       <th>SubCategory</th>
//                       <th>Place</th>
//                       <th>Store</th>
//                       <th>Amount</th>
//                       <th>Paid For</th>
//                       <th>Note</th>
//                       <th>Fixed</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {expenses.map((exp) => (
//                       <tr key={exp.id}>
//                         <td>
//                           {categories.find((c) => c.id === exp.category)
//                             ?.name || "-"}
//                         </td>
//                         <td>
//                           {subCategories.find((sc) => sc.id === exp.subCategory)
//                             ?.name || "-"}
//                         </td>
//                         <td>
//                           {places.find((p) => p.id === exp.place)?.name || "-"}
//                         </td>
//                         <td>{exp.store}</td>
//                         <td>{exp.amount}</td>
//                         <td>{exp.paidFor}</td>
//                         <td>{exp.note}</td>
//                         <td>{exp.isFixed ? "Yes" : "No"}</td>
//                         <td>
//                           <button
//                             className="btn btn-sm btn-danger"
//                             onClick={() => handleDelete(exp.id, "expense")}
//                           >
//                             Delete
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                     {expenses.length === 0 && (
//                       <tr>
//                         <td colSpan={9} className="text-center">
//                           No expenses
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// -----------------------------------------------------

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { jwtDecode } from "jwt-decode";
import {
  getCategories,
  getSubCategories,
  getPlaces,
  getExpenses,
  createCategory,
  createSubCategory,
  createPlace,
  createExpense,
  deleteCategory,
  deleteSubCategory,
  deletePlace,
  deleteExpense,
} from "../services/api";

export default function ExpenseManager() {
  const [formTab, setFormTab] = useState("category");
  const [tableTab, setTableTab] = useState("category");

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [places, setPlaces] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [selectedCategoryForPlace, setSelectedCategoryForPlace] = useState("");
  const [selectedSubCategoryForPlace, setSelectedSubCategoryForPlace] =
    useState("");
  const [expenseForm, setExpenseForm] = useState({
    category: "",
    subCategory: "",
    place: "",
    store: "",
    amount: "",
    paidFor: "",
    note: "",
    isFixed: false,
  });

  const [userId, setUserId] = useState(null);

  // Decode JWT to get userId
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const id =
        decoded[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ] ||
        decoded.sub ||
        null;
      setUserId(id);
    } catch (err) {
      console.error("Invalid token", err);
    }
  }, []);

  useEffect(() => {
    if (!userId) return; // wait for userId
    fetchData();
  }, [userId]);

  const fetchData = async () => {
    try {
      const [catRes, subRes, placeRes, expRes] = await Promise.all([
        getCategories(userId),
        getSubCategories(userId),
        getPlaces(userId),
        getExpenses(userId),
      ]);
      setCategories(catRes);
      setSubCategories(subRes);
      setPlaces(placeRes);
      setExpenses(expRes);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!categoryName || !userId) return;

    const payload = {
      name: categoryName,
      userId,
      isActive: true,
      createdDate: new Date().toISOString(),
      subCategories: [],
      places: [],
    };

    try {
      const res = await createCategory(payload);
      setCategories([...categories, res]);
      setCategoryName("");
    } catch (error) {
      console.error(
        "Failed to create category:",
        error.response?.data || error.message
      );
      alert(
        "Failed to create category: " + (error.response?.data || error.message)
      );
    }
  };

  const handleAddSubCategory = async (e) => {
    e.preventDefault();
    if (!subCategoryName || !selectedCategory || !userId) return;

    const payload = {
      name: subCategoryName,
      categoryId: selectedCategory,
      userId,
    };

    try {
      const res = await createSubCategory(payload);
      setSubCategories([...subCategories, res]);
      setSubCategoryName("");
      setSelectedCategory("");
    } catch (error) {
      console.error(
        "Failed to create subcategory:",
        error.response?.data || error.message
      );
      alert(
        "Failed to create subcategory: " +
          (error.response?.data || error.message)
      );
    }
  };

  const handleAddPlace = async (e) => {
    e.preventDefault();
    if (!placeName || !selectedCategoryForPlace || !userId) return;

    const payload = {
      name: placeName,
      categoryId: selectedCategoryForPlace,
      subCategoryId: selectedSubCategoryForPlace || null,
      userId,
    };

    try {
      const res = await createPlace(payload);
      setPlaces([...places, res]);
      setPlaceName("");
      setSelectedCategoryForPlace("");
      setSelectedSubCategoryForPlace("");
    } catch (error) {
      console.error(
        "Failed to create place:",
        error.response?.data || error.message
      );
      alert(
        "Failed to create place: " + (error.response?.data || error.message)
      );
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (
      !expenseForm.category ||
      !expenseForm.subCategory ||
      !expenseForm.amount ||
      !userId
    )
      return;

    const payload = { ...expenseForm, userId };
    try {
      const res = await createExpense(payload);
      setExpenses([...expenses, res]);
      setExpenseForm({
        category: "",
        subCategory: "",
        place: "",
        store: "",
        amount: "",
        paidFor: "",
        note: "",
        isFixed: false,
      });
    } catch (error) {
      console.error(
        "Failed to create expense:",
        error.response?.data || error.message
      );
      alert(
        "Failed to create expense: " + (error.response?.data || error.message)
      );
    }
  };

  const handleExpenseChange = (e) => {
    const { name, value, type, checked } = e.target;
    setExpenseForm({
      ...expenseForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDelete = async (id, type) => {
    try {
      if (type === "category") await deleteCategory(id);
      if (type === "subCategory") await deleteSubCategory(id);
      if (type === "place") await deletePlace(id);
      if (type === "expense") await deleteExpense(id);

      if (type === "category")
        setCategories(categories.filter((c) => c.id !== id));
      if (type === "subCategory")
        setSubCategories(subCategories.filter((c) => c.id !== id));
      if (type === "place") setPlaces(places.filter((p) => p.id !== id));
      if (type === "expense") setExpenses(expenses.filter((e) => e.id !== id));
    } catch (err) {
      console.error(`Error deleting ${type}`, err);
    }
  };

  return (
    <div className="container my-4">
      <div className="row g-4">
        {/* Card 1: Forms */}
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">Forms</div>
            <div className="card-body">
              <ul className="nav nav-tabs mb-3">
                {["category", "subCategory", "place", "expense"].map((tab) => (
                  <li className="nav-item" key={tab}>
                    <button
                      className={`nav-link ${formTab === tab ? "active" : ""}`}
                      onClick={() => setFormTab(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Category Form */}
              {formTab === "category" && (
                <form onSubmit={handleAddCategory}>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Category Name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                  <button className="btn btn-primary w-100">
                    Add Category
                  </button>
                </form>
              )}

              {/* SubCategory Form */}
              {formTab === "subCategory" && (
                <form onSubmit={handleAddSubCategory}>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="SubCategory Name"
                    value={subCategoryName}
                    onChange={(e) => setSubCategoryName(e.target.value)}
                  />
                  <select
                    className="form-select mb-2"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">-- Select Parent Category --</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <button className="btn btn-primary w-100">
                    Add SubCategory
                  </button>
                </form>
              )}

              {/* Place Form */}
              {formTab === "place" && (
                <form onSubmit={handleAddPlace}>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Place Name"
                    value={placeName}
                    onChange={(e) => setPlaceName(e.target.value)}
                  />
                  <select
                    className="form-select mb-2"
                    value={selectedCategoryForPlace}
                    onChange={(e) =>
                      setSelectedCategoryForPlace(e.target.value)
                    }
                  >
                    <option value="">-- Select Category --</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <select
                    className="form-select mb-2"
                    value={selectedSubCategoryForPlace}
                    onChange={(e) =>
                      setSelectedSubCategoryForPlace(e.target.value)
                    }
                  >
                    <option value="">
                      -- Select SubCategory (Optional) --
                    </option>
                    {subCategories
                      .filter(
                        (sc) => sc.categoryId === selectedCategoryForPlace
                      )
                      .map((sc) => (
                        <option key={sc.id} value={sc.id}>
                          {sc.name}
                        </option>
                      ))}
                  </select>
                  <button className="btn btn-warning w-100">Add Place</button>
                </form>
              )}

              {/* Expense Form */}
              {formTab === "expense" && (
                <form onSubmit={handleAddExpense}>
                  <div className="row g-2">
                    <div className="col-12 col-sm-6">
                      <select
                        className="form-select"
                        name="category"
                        value={expenseForm.category}
                        onChange={handleExpenseChange}
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
                    <div className="col-12 col-sm-6">
                      <select
                        className="form-select"
                        name="subCategory"
                        value={expenseForm.subCategory}
                        onChange={handleExpenseChange}
                        required
                      >
                        <option value="">Select SubCategory</option>
                        {subCategories
                          .filter(
                            (sc) => sc.categoryId === expenseForm.category
                          )
                          .map((sc) => (
                            <option key={sc.id} value={sc.id}>
                              {sc.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="col-12 col-sm-6">
                      <select
                        className="form-select"
                        name="place"
                        value={expenseForm.place}
                        onChange={handleExpenseChange}
                      >
                        <option value="">Select Place</option>
                        {places
                          .filter((p) => p.categoryId === expenseForm.category)
                          .map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="col-12 col-sm-6">
                      <input
                        type="text"
                        name="store"
                        className="form-control"
                        placeholder="Store"
                        value={expenseForm.store}
                        onChange={handleExpenseChange}
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <input
                        type="number"
                        name="amount"
                        className="form-control"
                        placeholder="Amount"
                        value={expenseForm.amount}
                        onChange={handleExpenseChange}
                        required
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <input
                        type="text"
                        name="paidFor"
                        className="form-control"
                        placeholder="Paid For"
                        value={expenseForm.paidFor}
                        onChange={handleExpenseChange}
                      />
                    </div>
                    <div className="col-12">
                      <textarea
                        name="note"
                        className="form-control"
                        placeholder="Note"
                        value={expenseForm.note}
                        onChange={handleExpenseChange}
                      />
                    </div>
                    <div className="col-12">
                      <div className="form-check mb-2">
                        <input
                          type="checkbox"
                          name="isFixed"
                          className="form-check-input"
                          checked={expenseForm.isFixed}
                          onChange={handleExpenseChange}
                        />
                        <label className="form-check-label">
                          Fixed Expense
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-success w-100">
                        Add Expense
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Card 2: Tables */}
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-info text-white">Tables</div>
            <div className="card-body">
              <ul className="nav nav-tabs mb-3">
                {["category", "subCategory", "place", "expense"].map((tab) => (
                  <li className="nav-item" key={tab}>
                    <button
                      className={`nav-link ${tableTab === tab ? "active" : ""}`}
                      onClick={() => setTableTab(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)} Table
                    </button>
                  </li>
                ))}
              </ul>

              {/* Category Table */}
              {tableTab === "category" && (
                <table className="table table-bordered table-sm">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((cat) => (
                      <tr key={cat.id}>
                        <td>{cat.name}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(cat.id, "category")}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {categories.length === 0 && (
                      <tr>
                        <td colSpan={2} className="text-center">
                          No categories
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}

              {/* SubCategory Table */}
              {tableTab === "subCategory" && (
                <table className="table table-bordered table-sm">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subCategories.map((sc) => (
                      <tr key={sc.id}>
                        <td>{sc.name}</td>
                        <td>
                          {categories.find((c) => c.id === sc.categoryId)
                            ?.name || "-"}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(sc.id, "subCategory")}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {subCategories.length === 0 && (
                      <tr>
                        <td colSpan={3} className="text-center">
                          No subcategories
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}

              {/* Place Table */}
              {tableTab === "place" && (
                <table className="table table-bordered table-sm">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>SubCategory</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {places.map((p) => (
                      <tr key={p.id}>
                        <td>{p.name}</td>
                        <td>
                          {categories.find((c) => c.id === p.categoryId)
                            ?.name || "-"}
                        </td>
                        <td>
                          {subCategories.find((sc) => sc.id === p.subCategoryId)
                            ?.name || "-"}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(p.id, "place")}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {places.length === 0 && (
                      <tr>
                        <td colSpan={4} className="text-center">
                          No places
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}

              {/* Expense Table */}
              {tableTab === "expense" && (
                <table className="table table-bordered table-sm">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>SubCategory</th>
                      <th>Place</th>
                      <th>Store</th>
                      <th>Amount</th>
                      <th>Paid For</th>
                      <th>Note</th>
                      <th>Fixed</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((exp) => (
                      <tr key={exp.id}>
                        <td>
                          {categories.find((c) => c.id === exp.category)
                            ?.name || "-"}
                        </td>
                        <td>
                          {subCategories.find((sc) => sc.id === exp.subCategory)
                            ?.name || "-"}
                        </td>
                        <td>
                          {places.find((p) => p.id === exp.place)?.name || "-"}
                        </td>
                        <td>{exp.store}</td>
                        <td>{exp.amount}</td>
                        <td>{exp.paidFor}</td>
                        <td>{exp.note}</td>
                        <td>{exp.isFixed ? "Yes" : "No"}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(exp.id, "expense")}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {expenses.length === 0 && (
                      <tr>
                        <td colSpan={9} className="text-center">
                          No expenses
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
