import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import api from "../../hooks/api";
import notify from "../../hooks/notify";

const Settings = () => {
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

    const copyToClipboard = () => {
        const passwordInput = document.getElementById("password");
        passwordInput.select();
        document.execCommand("copy");
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    const generatePassword = () => {
        const lowerCase = "abcdefghijklmnopqrstuvwxyz";
        const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const digits = "0123456789";
        const allChars = lowerCase + upperCase + digits;
        let newPassword = "";

        newPassword += lowerCase.charAt(Math.floor(Math.random() * lowerCase.length));
        newPassword += upperCase.charAt(Math.floor(Math.random() * upperCase.length));
        newPassword += digits.charAt(Math.floor(Math.random() * digits.length));

        for (let i = 3; i < 12; i++) {
            newPassword += allChars.charAt(Math.floor(Math.random() * allChars.length));
        }

        newPassword = newPassword
            .split("")
            .sort(() => Math.random() - 0.5)
            .join("");

        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(newPassword)) {
            console.error("Generated password does not match the criteria.");
            return;
        }

        setPassword(newPassword);
    };

    const updatePassword = async (e) => {
        e.preventDefault();

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

        try {

            const token = localStorage.getItem("token");
            const response = await api.post("/dashboard/settings/update-password", { password }, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            if (response.status === 200) {
                notify("success", "Password updated successfully.");
            } else {
                notify("error", "An error occurred while updating the password.");
            }
        } catch (error) {
            console.error(error);
            notify("error", "An error occurred while updating the password.");
        }
    };

    return (
        <div className="settings-con">
            <p className="title-section">Settings</p>

            <div className="update-password-con">
                <p className="title-con">Password</p>

                <div className="input-con">
                    <input
                        type={isPasswordVisible ? "text" : "password"}
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter new password"
                        autoComplete="off"
                    />
                    <button
                        type="button"
                        className="toggle-password-btn"
                        onClick={togglePasswordVisibility}
                    >
                        <i className={isPasswordVisible ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                    </button>
                    <button
                        type="button"
                        className="copy-password-btn"
                        onClick={copyToClipboard}
                    >
                        <i className="fas fa-copy"></i>
                    </button>
                </div>

                <button className="generate-password-btn" onClick={generatePassword}>
                    <i className="fas fa-sync-alt"></i> Generate Password
                </button>

                <button className="update-btn" onClick={updatePassword}>
                    Update Password
                </button>
            </div>

            {isCopied && <div className="copy-popup">Password copied to clipboard!</div>}
        </div>
    );
};

export default Settings;
