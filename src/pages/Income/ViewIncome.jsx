import React from "react";
import IncomeTable from "../../components/income/IncomeTable";

const ViewIncome = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">All Incomes</h2>
      <IncomeTable />
    </div>
  );
};

export default ViewIncome;
