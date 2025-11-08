// src/pages/Welcome.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center bg-dark text-white">
      <h1 className="display-3 mb-4">🌼 Welcome to Internship Tracker Dashboard 🌼</h1>
      <p className="lead mb-5">
        Manage and apply for internships effortlessly. Admins, interns, and users all in one place.
      </p>
      <div className="d-flex gap-3">
        <button
          className="btn btn-light btn-lg"
          onClick={() => navigate("/signup")}
        >
          Signup
        </button>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
}