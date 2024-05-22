import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import api from "../../hooks/api";
import notify from "../../hooks/notify";

const Password = () => {
  const [passwords, setPasswords] = useState([]);
  const [showPassword, setShowPassword] = useState({});
  const [showDropdown, setShowDropdown] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [editingPassword, setEditingPassword] = useState(null);
  const [addingPassword, setAddingPassword] = useState(false);
  const [visibleCategories, setVisibleCategories] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPasswords();
  }, []);

  const fetchPasswords = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/dashboard/password/fetchAll", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPasswords(response.data);
    } catch (error) {
      console.error("Error fetching passwords:", error);
    }
  };

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const togglePasswordVisibility = (id) => {
    setShowPassword((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  const toggleDropdown = (id) => {
    setShowDropdown((prevId) => (prevId === id ? null : id));
  };

  const toggleCategoryVisibility = (category) => {
    setVisibleCategories((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  const handleEditPassword = (password) => {
    setEditingPassword(password);
    setShowDropdown(null);
  };

  const handleDeletePassword = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/dashboard/password/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPasswords((prevPasswords) => prevPasswords.filter((pw) => pw._id !== id));
      notify("success", "Password deleted successfully");
    } catch (error) {
      console.error("Error deleting password:", error);
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await api.put(`/dashboard/password/update/${editingPassword._id}`, editingPassword, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPasswords((prevPasswords) =>
        prevPasswords.map((pw) =>
          pw._id === editingPassword._id ? editingPassword : pw
        )
      );
      setEditingPassword(null);
      notify("success", "Password updated successfully");
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  const handleAddPassword = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/dashboard/password/add",
        {
          category: addingPassword.category,
          username: addingPassword.username,
          email: addingPassword.email,
          password: addingPassword.password,
          description: addingPassword.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPasswords((prevPasswords) => [...prevPasswords, response.data]);
      setAddingPassword(false);
      notify("success", "Password added successfully");
    } catch (error) {
      console.error("Error adding password:", error);
    }
  };

  const filteredPasswords = passwords.filter((password) => {
    return (
      password.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      password.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      password.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      password.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const groupedPasswords = filteredPasswords.reduce((acc, password) => {
    const { category } = password;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(password);
    return acc;
  }, {});

  return (
    <div className="password-con">
      <p className="title-section">Passwords</p>

      <div className="option-filter">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search passwords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="add-password-btn" onClick={() => setAddingPassword(true)}>
          <i className="bx bx-add-to-queue"></i>
          <span>Add Password</span>
        </button>
      </div>

      <div className="password-list-con">
        {Object.keys(groupedPasswords).map((category) => (
          <div key={category}>
            <div
              className="category-title"
              onClick={() => toggleCategoryVisibility(category)}
            >
              <i
                className={`show-category bx ${
                  visibleCategories[category]
                    ? "bx-chevron-down"
                    : "bx-chevron-right"
                }`}
              ></i>
              <p>{category}</p>
              <p>({groupedPasswords[category].length})</p>
              <div className="bar"></div>
            </div>

            {visibleCategories[category] && (
              <div className="password-list-data">
                {groupedPasswords[category].map((pw) => (
                  <div key={pw._id} className="password-item">
                    <div className="password-data">
                      <div className="input-con">
                        <input
                          name="username"
                          id="username"
                          placeholder="Username"
                          value={pw.username}
                          disabled
                          autoComplete="off"
                        />
                        <button
                          type="button"
                          className="copy-clipboard-btn"
                          onClick={() => handleCopyToClipboard(pw.username)}
                        >
                          <i className="fas fa-copy"></i>
                        </button>
                      </div>
                      <div className="input-con">
                        <input
                          name="email"
                          id="email"
                          placeholder="Email"
                          value={pw.email}
                          disabled
                          autoComplete="off"
                        />
                        <button
                          type="button"
                          className="copy-clipboard-btn"
                          onClick={() => handleCopyToClipboard(pw.email)}
                        >
                          <i className="fas fa-copy"></i>
                        </button>
                      </div>
                      <div className="input-con">
                        <input
                          name="password"
                          id="password"
                          placeholder="Password"
                          value={showPassword[pw._id] ? pw.password : "••••••••"}
                          disabled
                          autoComplete="off"
                        />
                        <button
                          type="button"
                          className="toggle-password-btn"
                          onClick={() => togglePasswordVisibility(pw._id)}
                        >
                          <i
                            className={
                              showPassword[pw._id]
                                ? "fas fa-eye-slash"
                                : "fas fa-eye"
                            }
                          ></i>
                        </button>
                        <button
                          type="button"
                          className="copy-clipboard-btn"
                          onClick={() => handleCopyToClipboard(pw.password)}
                        >
                          <i className="fas fa-copy"></i>
                        </button>
                      </div>
                      <div className="input-con">
                        <textarea
                          name="description"
                          id="description"
                          placeholder="Description"
                          value={pw.description}
                          disabled
                        ></textarea>
                      </div>
                    </div>
                    <div className="option">
                      <i
                        className="fas fa-ellipsis-v"
                        onClick={() => toggleDropdown(pw._id)}
                      ></i>
                      {showDropdown === pw._id && (
                        <div className="dropdown-content">
                          <button onClick={() => handleEditPassword(pw)}>
                            Edit
                          </button>
                          <button onClick={() => handleDeletePassword(pw._id)}>
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {isCopied && <div className="copy-popup">Copied to clipboard!</div>}

      {editingPassword && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Password</h2>
            <form onSubmit={handleSaveEdit}>
              <div className="input-con">
                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={editingPassword.category}
                  onChange={(e) =>
                    setEditingPassword({
                      ...editingPassword,
                      category: e.target.value,
                    })
                  }
                />
              </div>
              <div className="input-con">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={editingPassword.username}
                  onChange={(e) =>
                    setEditingPassword({
                      ...editingPassword,
                      username: e.target.value,
                    })
                  }
                />
              </div>
              <div className="input-con">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={editingPassword.email}
                  onChange={(e) =>
                    setEditingPassword({
                      ...editingPassword,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div className="input-con">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={editingPassword.password}
                  onChange={(e) =>
                    setEditingPassword({
                      ...editingPassword,
                      password: e.target.value,
                    })
                  }
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() =>
                    setShowPassword((prevState) => ({
                      ...prevState,
                      edit: !prevState.edit,
                    }))
                  }
                >
                  <i
                    className={
                      showPassword.edit ? "fas fa-eye-slash" : "fas fa-eye"
                    }
                  ></i>
                </button>
              </div>
              <div className="input-con">
                <textarea
                  name="description"
                  placeholder="Description"
                  value={editingPassword.description}
                  onChange={(e) =>
                    setEditingPassword({
                      ...editingPassword,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div className="btn-modal">
                <button type="submit" className="save-btn">
                  Save
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setEditingPassword(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {addingPassword && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Password</h2>
            <form onSubmit={handleAddPassword}>
              <div className="input-con">
                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={addingPassword?.category || ""}
                  onChange={(e) =>
                    setAddingPassword({
                      ...addingPassword,
                      category: e.target.value,
                    })
                  }
                />
              </div>
              <div className="input-con">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={addingPassword?.username || ""}
                  onChange={(e) =>
                    setAddingPassword({
                      ...addingPassword,
                      username: e.target.value,
                    })
                  }
                />
              </div>
              <div className="input-con">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={addingPassword?.email || ""}
                  onChange={(e) =>
                    setAddingPassword({
                      ...addingPassword,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div className="input-con">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={addingPassword?.password || ""}
                  onChange={(e) =>
                    setAddingPassword({
                      ...addingPassword,
                      password: e.target.value,
                    })
                  }
                />
              </div>
              <div className="input-con">
                <textarea
                  name="description"
                  placeholder="Description"
                  value={addingPassword?.description || ""}
                  onChange={(e) =>
                    setAddingPassword({
                      ...addingPassword,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div className="btn-modal">
                <button type="submit" className="save-btn">
                  Save
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setAddingPassword(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Password;
