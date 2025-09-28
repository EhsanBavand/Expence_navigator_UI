// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { jwtDecode } from "jwt-decode";
// import {
//   getCategories,
//   getSubCategories,
//   getPlaces,
//   getExpenses,
//   createCategory,
//   createSubCategory,
//   createPlace,
//   createExpense,
//   deleteCategory,
//   deleteSubCategory,
//   deletePlace,
//   deleteExpense,
//   updateCategory,
//   updateSubCategory,
//   updatePlace,
//   updateExpense,
// } from "../services/api";

// export default function ExpenseManager() {
//   const [formTab, setFormTab] = useState("category");
//   const [tableTab, setTableTab] = useState("category");

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

//   const [userId, setUserId] = useState(null);

//   // edit modal states
//   const [showModal, setShowModal] = useState(false);
//   const [editType, setEditType] = useState(null);
//   const [editItem, setEditItem] = useState(null);

//   // Decode JWT to get userId
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     try {
//       const decoded = jwtDecode(token);
//       const id =
//         decoded[
//           "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
//         ] ||
//         decoded.sub ||
//         null;
//       setUserId(id);
//     } catch (err) {
//       console.error("Invalid token", err);
//     }
//   }, []);

//   useEffect(() => {
//     if (!userId) return;
//     fetchData();
//   }, [userId]);

//   const fetchData = async () => {
//     try {
//       const [catRes, subRes, placeRes, expRes] = await Promise.all([
//         getCategories(userId),
//         getSubCategories(userId),
//         getPlaces(userId),
//         getExpenses(userId),
//       ]);
//       setCategories(catRes);
//       setSubCategories(subRes);
//       setPlaces(placeRes);
//       setExpenses(expRes);
//     } catch (err) {
//       console.error("Error fetching data", err);
//     }
//   };

//   // === ADD handlers (unchanged) ===
//   const handleAddCategory = async (e) => {
//     /* your existing code */
//   };
//   const handleAddSubCategory = async (e) => {
//     /* your existing code */
//   };
//   const handleAddPlace = async (e) => {
//     /* your existing code */
//   };
//   const handleAddExpense = async (e) => {
//     /* your existing code */
//   };

//   const handleExpenseChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setExpenseForm({
//       ...expenseForm,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   // === Delete handler (unchanged) ===
//   const handleDelete = async (id, type) => {
//     /* your existing code */
//   };

//   // === Edit ===
//   const handleEdit = (item, type) => {
//     setEditItem(item);
//     setEditType(type);
//     setShowModal(true);
//   };

//   const handleUpdate = async () => {
//     try {
//       if (editType === "category") {
//         const updated = await updateCategory(editItem.id, editItem);
//         setCategories(
//           categories.map((c) => (c.id === updated.id ? updated : c))
//         );
//       }
//       if (editType === "subCategory") {
//         const updated = await updateSubCategory(editItem.id, editItem);
//         setSubCategories(
//           subCategories.map((sc) => (sc.id === updated.id ? updated : sc))
//         );
//       }
//       if (editType === "place") {
//         const updated = await updatePlace(editItem.id, editItem);
//         setPlaces(places.map((p) => (p.id === updated.id ? updated : p)));
//       }
//       if (editType === "expense") {
//         const updated = await updateExpense(editItem.id, editItem);
//         setExpenses(expenses.map((e) => (e.id === updated.id ? updated : e)));
//       }
//       setShowModal(false);
//       setEditItem(null);
//       setEditType(null);
//     } catch (err) {
//       console.error(`Error updating ${editType}`, err);
//       alert("Update failed: " + (err.response?.data || err.message));
//     }
//   };

//   return (
//     <div className="container my-4">
//       <div className="row g-4">
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
//                             className="btn btn-sm btn-primary me-2"
//                             onClick={() => handleEdit(cat.id, "category")}
//                           >
//                             Edit
//                           </button>
//                           <button
//                             className="btn btn-sm btn-danger"
//                             onClick={() => handleDelete(cat.id, "category")}
//                           >
//                             {" "}
//                             Delete{" "}
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
//                             className="btn btn-sm btn-primary me-2"
//                             onClick={() => handleEdit(sc.id, "subCategory")}
//                           >
//                             Edit
//                           </button>
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
//                             className="btn btn-sm btn-primary me-2"
//                             onClick={() => handleEdit(p.id, "place")}
//                           >
//                             Edit
//                           </button>
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

//         {/* Modal */}
//         {showModal && (
//           <div className="modal show fade d-block" tabIndex="-1">
//             <div className="modal-dialog">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title">
//                     Edit{" "}
//                     {editType?.charAt(0).toUpperCase() + editType?.slice(1)}
//                   </h5>
//                   <button
//                     type="button"
//                     className="btn-close"
//                     onClick={() => setShowModal(false)}
//                   />
//                 </div>
//                 <div className="modal-body">
//                   {/* Different forms depending on type */}
//                   {editType === "category" && (
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={editItem?.name || ""}
//                       onChange={(e) =>
//                         setEditItem({ ...editItem, name: e.target.value })
//                       }
//                     />
//                   )}
//                   {editType === "subCategory" && (
//                     <>
//                       <input
//                         type="text"
//                         className="form-control mb-2"
//                         value={editItem?.name || ""}
//                         onChange={(e) =>
//                           setEditItem({ ...editItem, name: e.target.value })
//                         }
//                       />
//                       <select
//                         className="form-select"
//                         value={editItem?.categoryId || ""}
//                         onChange={(e) =>
//                           setEditItem({
//                             ...editItem,
//                             categoryId: e.target.value,
//                           })
//                         }
//                       >
//                         <option value="">-- Select Category --</option>
//                         {categories.map((c) => (
//                           <option key={c.id} value={c.id}>
//                             {c.name}
//                           </option>
//                         ))}
//                       </select>
//                     </>
//                   )}
//                   {editType === "place" && (
//                     <>
//                       <input
//                         type="text"
//                         className="form-control mb-2"
//                         value={editItem?.name || ""}
//                         onChange={(e) =>
//                           setEditItem({ ...editItem, name: e.target.value })
//                         }
//                       />
//                       <select
//                         className="form-select mb-2"
//                         value={editItem?.categoryId || ""}
//                         onChange={(e) =>
//                           setEditItem({
//                             ...editItem,
//                             categoryId: e.target.value,
//                           })
//                         }
//                       >
//                         <option value="">-- Select Category --</option>
//                         {categories.map((c) => (
//                           <option key={c.id} value={c.id}>
//                             {c.name}
//                           </option>
//                         ))}
//                       </select>
//                       <select
//                         className="form-select"
//                         value={editItem?.subCategoryId || ""}
//                         onChange={(e) =>
//                           setEditItem({
//                             ...editItem,
//                             subCategoryId: e.target.value,
//                           })
//                         }
//                       >
//                         <option value="">-- Select SubCategory --</option>
//                         {subCategories.map((sc) => (
//                           <option key={sc.id} value={sc.id}>
//                             {sc.name}
//                           </option>
//                         ))}
//                       </select>
//                     </>
//                   )}
//                   {editType === "expense" && (
//                     <>
//                       <input
//                         type="number"
//                         className="form-control mb-2"
//                         value={editItem?.amount || ""}
//                         onChange={(e) =>
//                           setEditItem({ ...editItem, amount: e.target.value })
//                         }
//                       />
//                       <input
//                         type="text"
//                         className="form-control mb-2"
//                         value={editItem?.store || ""}
//                         onChange={(e) =>
//                           setEditItem({ ...editItem, store: e.target.value })
//                         }
//                       />
//                       <textarea
//                         className="form-control"
//                         value={editItem?.note || ""}
//                         onChange={(e) =>
//                           setEditItem({ ...editItem, note: e.target.value })
//                         }
//                       />
//                     </>
//                   )}
//                 </div>
//                 <div className="modal-footer">
//                   <button
//                     className="btn btn-secondary"
//                     onClick={() => setShowModal(false)}
//                   >
//                     Cancel
//                   </button>
//                   <button className="btn btn-primary" onClick={handleUpdate}>
//                     Save Changes
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

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
  updateCategory,
  updateSubCategory,
  updatePlace,
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

  const handleEdit = async (id, type) => {
    try {
      if (type === "category") await updateCategory(id);
      if (type === "subCategory") await updateSubCategory(id);
      if (type === "place") await updatePlace(id);
      // if (type === "expense") await deleteExpense(id);

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
                            className="btn btn-sm btn-primary me-2"
                            onClick={() => handleEdit(cat.id, "category")}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(cat.id, "category")}
                          >
                            {" "}
                            Delete{" "}
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
                            className="btn btn-sm btn-primary me-2"
                            onClick={() => handleEdit(sc.id, "subCategory")}
                          >
                            Edit
                          </button>
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
                            className="btn btn-sm btn-primary me-2"
                            onClick={() => handleEdit(p.id, "place")}
                          >
                            Edit
                          </button>
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
