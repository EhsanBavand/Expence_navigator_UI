import React from "react";
import TitleBar from "../components/TitleBar";
import Sidebar from "../components/Sidebar";

const DashboardPage = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div>
      <TitleBar onLogout={handleLogout} />
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 p-4">
          <h2>📊 Welcome to your Dashboard</h2>
          <p>Summary of your financial activity will be displayed here.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
