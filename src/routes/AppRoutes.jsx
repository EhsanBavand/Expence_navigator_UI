// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import DashboardPage from "../pages/DashboardPage";

import ViewIncome from "../pages/Income/ViewIncome";
import AddIncome from "../pages/Income/AddIncome";
import DuplicateIncome from "../pages/Income/DuplicateIncome";
import DeleteAllIncome from "../pages/Income/DeleteAllIncome";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes */}
      <Route path="/dashboard/*" element={<DashboardPage />} />
    </Routes>
  );
};

export default AppRoutes;
