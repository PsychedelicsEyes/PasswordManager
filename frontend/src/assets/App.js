import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/app.scss";
import Login from "./pages/home/login";
import Dashboard from "./routes/dashboard";
import GuestRoute from "./routes/components/GuestRoute";

import { ToastContainer } from "react-toastify";

function App() {
  useEffect(() => {
    const handleContextmenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextmenu);
    return function cleanup() {
      document.removeEventListener("contextmenu", handleContextmenu);
    };
  }, []);
  return (
    <Router>
      <ToastContainer
        autoClose={3000}
        theme="dark"
        position="bottom-right"
        limit={1}
      />
      <Routes>
        <Route path="/" element={<GuestRoute redirectTo="/dashboard"> <Login /> </GuestRoute>} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
