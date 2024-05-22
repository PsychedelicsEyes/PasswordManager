import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../../hooks/api";

const ProtectedRoute = ({ children }) => {
  const [isVerified, setIsVerified] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await api.post("/auth/verify-token", {}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setIsVerified(response.status === 200);
        } catch {
          setIsVerified(false);
        }
      } else {
        setIsVerified(false);
      }
    };

    verifyToken();
  }, []);

  if (isVerified === null) {
    return <div className="loader active"></div>;
  }

  return isVerified ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
