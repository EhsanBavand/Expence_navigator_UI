import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="bg-light p-3"
      style={{ width: "220px", minHeight: "100vh" }}
    >
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            🏠 Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/add-income">
            ➕ Add Income
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/add-expense">
            ➕ Add Expense
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/monthly-report">
            📊 Monthly Report
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/calendar">
            📅 Calendar View
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/settings">
            ⚙️ Settings
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/import-excel">
            📁 Import Excel
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
