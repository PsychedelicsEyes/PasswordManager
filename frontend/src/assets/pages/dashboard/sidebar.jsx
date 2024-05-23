import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const sidebar = document.querySelector(".sidebar");
    const closeBtn = document.querySelector("#btn");

    const handleToggle = () => {
      sidebar.classList.toggle("open");
      menuBtnChange();
    };

    const menuBtnChange = () => {
      if (sidebar.classList.contains("open")) {
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
      } else {
        closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
      }
    };

    closeBtn.addEventListener("click", handleToggle);

    return () => {
      closeBtn.removeEventListener("click", handleToggle);
    };
  }, []);

  return (
    <div className="sidebar">
      <div className="logo_details">
        <i className="bx bx-notepad icon"></i>
        <div className="logo_name">Password Manager</div>
        <i className="bx bx-menu" id="btn"></i>
      </div>
      <ul className="nav-list">
        <li>
          <a href="/dashboard">
            <i className="bx bx-copy"></i>
            <span className="link_name">Password</span>
          </a>
        </li>
        <li>
          <a href="/dashboard/settings">
            <i className="bx bx-cog"></i>
            <span className="link_name">Settings</span>
          </a>
        </li>
        <li className="logout" onClick={handleLogout}>
          <a href="#">
            <i className="bx bx-log-out"></i>
            <span className="link_name">Logout</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
