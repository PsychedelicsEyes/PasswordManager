import React, { useState } from "react";
import api from "../../hooks/api";
import notify from "../../hooks/notify";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const password = e.target.password.value;

    if (password === "") {
      notify("error", "Please enter a password.");
      document.getElementById("password").classList.add("required-field");
      return;
    }

    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)) {
      notify(
        "error",
        "Invalid password format. Need to be at least 8 characters long, with at least one uppercase letter, one lowercase letter, and one number."
      );
      document.getElementById("password").classList.add("required-field");
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("/auth/sign-in", { password });
      if (response.status === 200) {
        console.log(response)
        localStorage.setItem("token", response.data.token);
        window.location.href = "/dashboard";
      }
    } catch (error) {
      if (error.response) {
        notify(
          "error",
          error.response.data.message || "An error occurred while signing in."
        );
      } else if (error.request) {
        notify("error", "No response from the server. Please try again later.");
      } else {
        notify("error", "An error occurred. Please try again.");
      }
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <div className="login-container">
      {isLoading ? (
        <>
          <div className="loader active"></div>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <div className="password">
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              id="password"
              name="password"
              autoComplete="new-password"
            />
            <button
              type="button"
              className="toggle-password-btn"
              onClick={togglePasswordVisibility}
            >
              <i
                className={
                  isPasswordVisible ? "fas fa-eye" : "fas fa-eye-slash"
                }
              ></i>
            </button>
          </div>
          <button className="login-btn">Sign In</button>
        </form>
      )}
    </div>
  );
};

export default Login;
