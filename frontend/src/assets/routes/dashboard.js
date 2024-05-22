import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";
import Password from "../pages/dashboard/password";
import Settings from "../pages/dashboard/settings";
import Sidebar from "../pages/dashboard/sidebar";

function Auth() {
  return (
    <>
      <Sidebar />
      <div className="dashboard-section">
        <Routes>
          <Route path="/" element={<ProtectedRoute><Password /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        </Routes>
      </div>
    </>
  );
}

export default Auth;