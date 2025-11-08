import React, { useEffect, useState } from "react";

export default function UserDashboard({ currentUser, setCurrentUser }) {
  const [user, setUser] = useState(currentUser);
  const [programs, setPrograms] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null); // for modal

  // Load data from localStorage
  useEffect(() => {
    const storedPrograms = JSON.parse(localStorage.getItem("programs")) || [];
    const storedApplications = JSON.parse(localStorage.getItem("applications")) || [];
    setPrograms(storedPrograms);
    setApplications(storedApplications);
  }, []);

  // Save updates back to localStorage
  const updateLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Apply to a program
  const applyProgram = (programId) => {
    const newApplications = [
      ...applications,
      { userEmail: user.email, programId, status: "Pending" },
    ];
    setApplications(newApplications);
    updateLocalStorage("applications", newApplications);

    alert(`✅ Applied successfully for ${programs.find((p) => p.id === programId).name}!`);
  };

  // Get programs applied by current user
  const appliedPrograms = applications
    .filter((app) => app.userEmail === user.email)
    .map((app) => {
      const prog = programs.find((p) => p.id === app.programId);
      return { ...prog, status: app.status };
    });

  // Open modal for program details
  const showProgramModal = (program) => {
    setSelectedProgram(program);
    const modal = new window.bootstrap.Modal(document.getElementById("programModal"));
    modal.show();
  };

  // Check if already applied
  const isApplied = (programId) =>
    applications.some((app) => app.userEmail === user.email && app.programId === programId);

  return (
    <div className="container-fluid bg-light min-vh-100">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 bg-white shadow-sm p-4">
          <h3 className="text-center text-purple fw-bold mb-4">👤 Profile</h3>
          <div className="border rounded p-3 mb-4">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Password:</strong> {user.password}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>

          <h5 className="fw-bold text-purple">📄 Applied Programs</h5>
          <ul className="list-group mb-4">
            {appliedPrograms.length > 0 ? (
              appliedPrograms.map((p) => (
                <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {p.name}
                  <span
                    className={`badge ${
                      p.status === "Selected"
                        ? "bg-success"
                        : p.status === "Rejected"
                        ? "bg-danger"
                        : "bg-secondary"
                    }`}
                  >
                    {p.status}
                  </span>
                </li>
              ))
            ) : (
              <li className="list-group-item text-muted">No programs applied yet.</li>
            )}
          </ul>
        </div>

        {/* Dashboard */}
        <div className="col-md-9 p-5">
          <h2 className="fw-bold text-purple mb-4">🎯 Available Internship Programs</h2>
          <div className="row g-4">
            {programs.map((p) => (
              <div className="col-md-6" key={p.id}>
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5
                      className="card-title text-purple fw-bold"
                      style={{ cursor: "pointer" }}
                      onClick={() => showProgramModal(p)}
                    >
                      {p.name}
                    </h5>
                    <p className="text-muted mb-1"><strong>Deadline:</strong> {p.deadline}</p>
                    <p className="mb-2">
                      <span className={`badge ${
                        p.status === "Closed"
                          ? "bg-danger"
                          : p.status === "Closing Soon"
                          ? "bg-warning text-dark"
                          : "bg-success"
                      }`}>
                        {p.status}
                      </span>
                    </p>
                    <button
                      className={`btn w-100 ${
                        isApplied(p.id)
                          ? "btn-secondary"
                          : "btn-primary"
                      }`}
                      onClick={() => applyProgram(p.id)}
                      disabled={isApplied(p.id) || p.status === "Closed"}
                    >
                      {isApplied(p.id)
                        ? "Applied"
                        : p.status === "Closed"
                        ? "Closed"
                        : "Apply"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Program Details Modal */}
      <div
        className="modal fade"
        id="programModal"
        tabIndex="-1"
        aria-labelledby="programModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {selectedProgram && (
              <>
                <div className="modal-header">
                  <h5 className="modal-title text-purple fw-bold" id="programModalLabel">
                    {selectedProgram.name}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p><strong>Description:</strong> {selectedProgram.description}</p>
                  <p><strong>Deadline:</strong> {selectedProgram.deadline}</p>
                  <p><strong>Status:</strong> {selectedProgram.status}</p>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
