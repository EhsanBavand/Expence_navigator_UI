import React from "react";

const DuplicateIncome = () => {
  const handleDuplicate = (type) => {
    const url =
      type === "month"
        ? "/api/income/duplicatenextmonth"
        : "/api/income/duplicatenextyear";

    fetch(url, { method: "POST" }).then(
      (res) => res.ok && alert(`Duplicated to next ${type}!`)
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Duplicate Income</h2>
      <button
        onClick={() => handleDuplicate("month")}
        className="bg-green-500 text-white px-4 py-2 mr-2 rounded"
      >
        Next Month
      </button>
      <button
        onClick={() => handleDuplicate("year")}
        className="bg-green-700 text-white px-4 py-2 rounded"
      >
        Next Year
      </button>
    </div>
  );
};

export default DuplicateIncome;
