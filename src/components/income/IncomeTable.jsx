import React, { useEffect, useState } from "react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const IncomeTable = () => {
  const [incomes, setIncomes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("/api/income/getall")
      .then((res) => res.json())
      .then((data) => setIncomes(data));
  }, []);

  const handleDelete = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    fetch(`/api/income/delete/${selectedId}`, { method: "DELETE" }).then(() => {
      setIncomes(incomes.filter((i) => i.id !== selectedId));
      setShowModal(false);
    });
  };

  return (
    <div>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th>Owner</th>
            <th>Source</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {incomes.map((income) => (
            <tr key={income.id}>
              <td>{income.owner}</td>
              <td>{income.sourceType}</td>
              <td>{income.amount}</td>
              <td>{new Date(income.date).toLocaleDateString()}</td>
              <td>
                <button>Edit</button>
                <button onClick={() => handleDelete(income.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <DeleteConfirmationModal
          onConfirm={confirmDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default IncomeTable;
