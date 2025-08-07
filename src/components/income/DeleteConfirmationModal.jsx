import React from "react";

const DeleteConfirmationModal = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
    <div className="bg-white p-6 rounded shadow">
      <p className="mb-4">Are you sure you want to delete this income?</p>
      <div className="flex gap-4">
        <button
          onClick={onConfirm}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Yes
        </button>
        <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </div>
  </div>
);

export default DeleteConfirmationModal;
