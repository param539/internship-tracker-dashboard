import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ setCurrentUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "User", // added role selection
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const interns = JSON.parse(localStorage.getItem("interns")) || [];

  let user;

  if (formData.role === "Intern") {
    user = interns.find(
      (u) => u.email === formData.email && u.password === formData.password
    );
  } else {
    user = users.find(
      (u) => u.email === formData.email && u.password === formData.password && u.role === formData.role
    );
  }

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    setCurrentUser(user);

    if (user.role === "Admin") navigate("/admin");
    else navigate("/dashboard");
  } else {
    alert(" Invalid email, password, or role. Please try again.");
  }
};

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ minWidth: "350px" }}>
        <h2 className="card-title text-center mb-3">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              name="role"
              className="form-select"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="User">User</option>
              <option value="Intern">Intern</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
        <p className="text-center mt-3">
          Not registered? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}
