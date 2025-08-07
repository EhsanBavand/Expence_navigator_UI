import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-white border-end" style={{ width: "250px", minHeight: "100vh" }}>
      <div className="p-3">
        <h5 className="mb-4">💰 ExpenseNav</h5>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              <i className="bi bi-house-door-fill me-2"></i> Dashboard
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/income">
              <i className="bi bi-cash-coin me-2"></i> Income
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/expenses">
              <i className="bi bi-cart-check-fill me-2"></i> Expenses
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/calendar">
              <i className="bi bi-calendar2-event-fill me-2"></i> Calendar
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/settings">
              <i className="bi bi-gear-fill me-2"></i> Settings
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/import-excel">
              <i className="bi bi-file-earmark-arrow-up-fill me-2"></i> Import Excel
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
