import React, { useState } from "react";

const AddIncome = () => {
  const [income, setIncome] = useState({
    userId: "",
    owner: "",
    sourceType: "",
    amount: 0,
    date: "",
    month: 0,
    year: 0,
    isRecurring: false,
    isEstimated: false,
    createdBy: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setIncome({
      ...income,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/income/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(income),
    }).then((res) => res.ok && alert("Income added successfully!"));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Add Income</h2>
      <input
        name="owner"
        placeholder="Owner"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        name="sourceType"
        placeholder="Source Type"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        name="amount"
        type="number"
        placeholder="Amount"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        name="date"
        type="date"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        name="month"
        type="number"
        placeholder="Month"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        name="year"
        type="number"
        placeholder="Year"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        name="createdBy"
        placeholder="Created By"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        name="description"
        placeholder="Description"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <label>
        <input type="checkbox" name="isRecurring" onChange={handleChange} />
        Recurring
      </label>
      <label>
        <input type="checkbox" name="isEstimated" onChange={handleChange} />
        Estimated
      </label>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default AddIncome;
