import React, { useState } from "react";

const DeleteAllIncome = () => {
  const [confirm, setConfirm] = useState(false);

  const handleDeleteAll = () => {
    fetch("/api/income/deleteall", { method: "DELETE" }).then(
      (res) => res.ok && alert("All incomes deleted!")
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Delete All Incomes</h2>
      {!confirm ? (
        <button
          onClick={() => setConfirm(true)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete All
        </button>
      ) : (
        <div>
          <p className="mb-2">Are you sure?</p>
          <button
            onClick={handleDeleteAll}
            className="bg-red-700 text-white px-4 py-2 mr-2 rounded"
          >
            Yes
          </button>
          <button
            onClick={() => setConfirm(false)}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteAllIncome;
