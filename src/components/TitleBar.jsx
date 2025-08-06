import React from "react";

const TitleBar = ({ onLogout }) => {
  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <span className="navbar-brand mb-0 h1">💰 Expense Navigator</span>
      <button className="btn btn-danger" onClick={onLogout}>
        Logout
      </button>
    </nav>
  );
};

export default TitleBar;
