import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Programs from "./pages/program";
import Applications from "./pages/Applications";
import Tasks from "./pages/Tasks";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // sample Datas
 useEffect(() => {
  // USERS (Admins, Users, Interns)
  if (!localStorage.getItem("users")) {
    const users = [
      // Admins
      { name: "Admin1", email: "admin1@gmail.com", password: "admin123", role: "Admin" },
      { name: "Admin2", email: "admin2@gmail.com", password: "admin123", role: "Admin" },
      { name: "Admin3", email: "admin3@gmail.com", password: "admin123", role: "Admin" },

      // Normal Users
      { name: "Ram", email: "ram@gmail.com", password: "user123", role: "User" },
      { name: "Lucky", email: "lucky@gmail.com", password: "user123", role: "User" },
      { name: "Barath", email: "barath@gmail.com", password: "user123", role: "User" },
      { name: "Beeshma", email: "beeshma@gmail.com", password: "user123", role: "User" },
    ];
    localStorage.setItem("users", JSON.stringify(users));
  }

  // PROGRAMS
  if (!localStorage.getItem("programs")) {
    const programs = [
      { id: 1, name: "Frontend Internship", description: "Learn React, HTML, CSS", deadline: "2025-12-30", status: "Active" },
      { id: 2, name: "Backend Internship", description: "Node.js and Databases", deadline: "2025-11-30", status: "Active" },
      { id: 3, name: "Cloud & DevOps", description: "AWS, Docker, Kubernetes", deadline: "2025-10-28", status: "Closing Soon" },
      { id: 4, name: "AI Research Program", description: "Machine Learning Basics", deadline: "2025-09-30", status: "Closed" },
      { id: 5, name: "Cybersecurity Bootcamp", description: "Learn Penetration Testing", deadline: "2025-10-01", status: "Closed" },
      { id: 6, name: "Full Stack Internship", description: "MERN Stack Project", deadline: "2025-11-10", status: "Active" },
      { id: 7, name: "Data Science Internship", description: "Python, Pandas, Visualization", deadline: "2025-11-25", status: "Active" },
      { id: 8, name: "UI/UX Internship", description: "Design with Figma and Adobe XD", deadline: "2025-11-15", status: "Closing Soon" },
    ];
    localStorage.setItem("programs", JSON.stringify(programs));
  }

  // APPLICATIONS
  if (!localStorage.getItem("applications")) {
    const applications = [
      { userEmail: "ram@gmail.com", programId: 1, status: "Selected" }, // Ram selected → becomes intern
      { userEmail: "lucky@gmail.com", programId: 2, status: "Rejected" },
      { userEmail: "barath@gmail.com", programId: 3, status: "Pending" },
      { userEmail: "beeshma@gmail.com", programId: 4, status: "Not Seen" },
      { userEmail: "ram@gmail.com", programId: 6, status: "Pending" },
      { userEmail: "lucky@gmail.com", programId: 8, status: "Selected" },
    ];
    localStorage.setItem("applications", JSON.stringify(applications));
  }

  // TASKS
  if (!localStorage.getItem("tasks")) {
    const tasks = [
      { taskId: 1, internId: 101, programId: 1, title: "Build a Login Page", status: "Completed", deadline: "2025-10-15" },
      { taskId: 2, internId: 102, programId: 2, title: "Create REST API", status: "Missed Deadline", deadline: "2025-10-10" },
      { taskId: 3, internId: 103, programId: 1, title: "Responsive Navbar", status: "Completed", deadline: "2025-10-18" },
      { taskId: 4, internId: 104, programId: 6, title: "Database Schema Design", status: "In Progress", deadline: "2025-10-25" },
      { taskId: 5, internId: 105, programId: 7, title: "Data Cleaning using Pandas", status: "Pending", deadline: "2025-10-26" },
      { taskId: 6, internId: 106, programId: 8, title: "Design Landing Page", status: "Completed", deadline: "2025-10-20" },
    ];
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // INTERNS (include selected users as interns)
  if (!localStorage.getItem("interns")) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const applications = JSON.parse(localStorage.getItem("applications")) || [];

    // Users who are selected for any program
    const selectedUsers = applications
      .filter((app) => app.status === "Selected")
      .map((app) => users.find((u) => u.email === app.userEmail))
      .filter(Boolean); // remove undefined

    // Existing interns
    const interns = [
      { id: 101, name: "Arjun", email: "arjun@gmail.com", password: "intern123", role: "Intern" },
      { id: 102, name: "Karna", email: "karna@gmail.com", password: "intern123", role: "Intern" },
      { id: 103, name: "Abhimanyu", email: "abhimanyu@gmail.com", password: "intern123", role: "Intern" },
      { id: 104, name: "Nakula", email: "nakula@gmail.com", password: "intern123", role: "Intern" },
      { id: 105, name: "Sahadeva", email: "sahadeva@gmail.com", password: "intern123", role: "Intern" },
      { id: 106, name: "Draupadi", email: "draupadi@gmail.com", password: "intern123", role: "Intern" },
    ];

    // Add selected users as interns (assign new IDs dynamically)
    let nextId = 200; // start ID for new interns
    selectedUsers.forEach((u) => {
      if (!interns.find((i) => i.email === u.email)) {
        interns.push({ id: nextId++, name: u.name, email: u.email, password: u.password, role: "Intern" });
      }
    });

    localStorage.setItem("interns", JSON.stringify(interns));
  }

  // LOAD CURRENT USER
  const savedUser = JSON.parse(localStorage.getItem("currentUser"));
  if (savedUser) setCurrentUser(savedUser);
}, []);



  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/signup" element={<Signup setCurrentUser={setCurrentUser} />} />

        {/* Admin */}
        {currentUser && currentUser.role === "Admin" && (
          <>
            <Route
              path="/admin"
              element={<AdminDashboard currentUser={currentUser} setCurrentUser={setCurrentUser} handleLogout={handleLogout} />}
            />
            <Route path="/programs" element={<Programs currentUser={currentUser} />} />
            <Route path="/applications" element={<Applications currentUser={currentUser} />} />
            <Route path="/tasks" element={<Tasks currentUser={currentUser} />} />
          </>
        )}

        {/* User / Intern */}
        {currentUser && (currentUser.role === "User" || currentUser.role === "Intern") && (
          <>
            <Route
              path="/dashboard"
              element={<UserDashboard currentUser={currentUser} setCurrentUser={setCurrentUser} handleLogout={handleLogout} />}
            />
            <Route path="/programs" element={<Programs currentUser={currentUser} />} />
          </>
        )}

        {/* Redirect unknown paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}