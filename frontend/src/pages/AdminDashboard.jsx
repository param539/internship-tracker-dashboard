import React, { useState, useEffect } from "react";

export default function AdminDashboard({ currentUser, setCurrentUser }) {
  const [users, setUsers] = useState([]);
  const [interns, setInterns] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [applications, setApplications] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard"); // sidebar navigation

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem("users")) || []);
    setInterns(JSON.parse(localStorage.getItem("interns")) || []);
    setPrograms(JSON.parse(localStorage.getItem("programs")) || []);
    setApplications(JSON.parse(localStorage.getItem("applications")) || []);
    setTasks(JSON.parse(localStorage.getItem("tasks")) || []);
  }, []);

  const updateLocalStorage = () => {
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("interns", JSON.stringify(interns));
    localStorage.setItem("programs", JSON.stringify(programs));
    localStorage.setItem("applications", JSON.stringify(applications));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Approve applicant
  const approveApplicant = (userEmail, programId) => {
    const updatedUsers = [...users];
    const user = updatedUsers.find(u => u.email === userEmail);

    if (user) {
      user.role = "Intern";
      user.internId = Math.floor(100 + Math.random() * 900);
      setUsers(updatedUsers);

      // Add to interns array
      const newIntern = {
        id: user.internId,
        name: user.name,
        email: user.email,
        password: user.password,
        role: "Intern",
      };
      setInterns([...interns, newIntern]);

      // Update applications
      const updatedApplications = applications.map(app =>
        app.userEmail === userEmail && app.programId === programId
          ? { ...app, status: "Selected" }
          : app
      );
      setApplications(updatedApplications);

      updateLocalStorage();
      alert(`${user.name} selected as Intern for ${programs.find(p => p.id === programId)?.name}`);
    }
  };

  // Reject applicant
  const rejectApplicant = (userEmail, programId) => {
    const updatedApplications = applications.map(app =>
      app.userEmail === userEmail && app.programId === programId
        ? { ...app, status: "Rejected" }
        : app
    );
    setApplications(updatedApplications);
    updateLocalStorage();
    alert(`${userEmail} rejected for ${programs.find(p => p.id === programId)?.name}`);
  };

  // Add Program
  const addProgram = (newProgram) => {
    setPrograms([...programs, newProgram]);
    updateLocalStorage();
    alert(`${newProgram.name} added successfully`);
  };

  // Assign Task
  const assignTask = (task) => {
    setTasks([...tasks, task]);
    updateLocalStorage();
    alert(`Task assigned to ${interns.find(i => i.id === task.internId)?.name}`);
  };

  // Logout
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        {/* Sidebar */}
        <div className="col-md-2 bg-light p-3 border-end">
          <h4 className="text-primary mb-4">Admin Menu</h4>
          <ul className="nav flex-column">
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={() => setActiveTab("dashboard")}>🏠 Dashboard</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={() => setActiveTab("programs")}>📚 Programs</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={() => setActiveTab("applications")}>📋 Applications</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={() => setActiveTab("tasks")}>📝 Assign Tasks</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={() => setActiveTab("progress")}>📊 Progress</button>
            </li>
            <li className="nav-item mt-4">
              <button className="btn btn-danger w-100" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-10 p-4">
          {activeTab === "dashboard" && (
            <div>
              <h2>Welcome, {currentUser.name}</h2>
              <p>Use sidebar to manage programs, applications, tasks, and progress.</p>
            </div>
          )}

          {activeTab === "programs" && (
            <div>
              <h2>Programs</h2>
              {/* Add Program Form */}
              <AddProgramForm addProgram={addProgram} />
              {/* Show Programs */}
              <ProgramList programs={programs} />
            </div>
          )}

          {activeTab === "applications" && (
            <ApplicationsTab
              programs={programs}
              applications={applications}
              approveApplicant={approveApplicant}
              rejectApplicant={rejectApplicant}
            />
          )}

          {activeTab === "tasks" && (
            <AssignTasksTab interns={interns} programs={programs} assignTask={assignTask} />
          )}

          {activeTab === "progress" && (
            <ProgressTab interns={interns} tasks={tasks} programs={programs} />
          )}
        </div>
      </div>
    </div>
  );
}

// Components like AddProgramForm, ProgramList, ApplicationsTab, AssignTasksTab, ProgressTab
// You can create them in the same file or separate files.
// Each should update the localStorage via functions passed as props.
// AddProgramForm
function AddProgramForm({ addProgram }) {
  const [form, setForm] = useState({ name: "", description: "", deadline: "", status: "Active" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProgram = { id: Date.now(), ...form };
    addProgram(newProgram);
    setForm({ name: "", description: "", deadline: "", status: "Active" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 border p-3 rounded">
      <h5>Add Program</h5>
      <div className="mb-2">
        <input className="form-control" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
      </div>
      <div className="mb-2">
        <input className="form-control" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
      </div>
      <div className="mb-2">
        <input type="date" className="form-control" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} required />
      </div>
      <button className="btn btn-primary" type="submit">Add Program</button>
    </form>
  );
}

// ProgramList
function ProgramList({ programs }) {
  return (
    <div>
      <h5>All Programs</h5>
      <ul className="list-group">
        {programs.map(p => (
          <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
            {p.name} - <span className="badge bg-secondary">{p.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ApplicationsTab
function ApplicationsTab({ programs, applications, approveApplicant, rejectApplicant }) {
  return (
    <div>
      <h3>Applications</h3>
      {applications.length === 0 && <p>No applications yet</p>}
      {applications.map(app => (
        <div key={`${app.userEmail}-${app.programId}`} className="border p-2 mb-2 rounded d-flex justify-content-between align-items-center">
          <div>
            <p><b>{app.userEmail}</b> applied to <b>{programs.find(p => p.id === app.programId)?.name}</b></p>
            <p>Status: {app.status}</p>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-success btn-sm" onClick={() => approveApplicant(app.userEmail, app.programId)}>Approve</button>
            <button className="btn btn-danger btn-sm" onClick={() => rejectApplicant(app.userEmail, app.programId)}>Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
}

// AssignTasksTab
function AssignTasksTab({ interns, programs, assignTask }) {
  const [form, setForm] = useState({ internId: "", programId: "", title: "", deadline: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      taskId: Date.now(),
      ...form,
      status: "Pending",
    };
    assignTask(newTask);
    setForm({ internId: "", programId: "", title: "", deadline: "" });
  };

  return (
    <div>
      <h3>Assign Task</h3>
      <form onSubmit={handleSubmit} className="border p-3 rounded">
        <div className="mb-2">
          <select className="form-select" value={form.internId} onChange={e => setForm({ ...form, internId: parseInt(e.target.value) })} required>
            <option value="">Select Intern</option>
            {interns.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
          </select>
        </div>
        <div className="mb-2">
          <select className="form-select" value={form.programId} onChange={e => setForm({ ...form, programId: parseInt(e.target.value) })} required>
            <option value="">Select Program</option>
            {programs.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div className="mb-2">
          <input className="form-control" placeholder="Task Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
        </div>
        <div className="mb-2">
          <input type="date" className="form-control" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} required />
        </div>
        <button className="btn btn-primary" type="submit">Assign Task</button>
      </form>
    </div>
  );
}

// ProgressTab
function ProgressTab({ interns, tasks, programs }) {
  return (
    <div>
      <h3>Intern Progress</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Intern</th>
            <th>Program</th>
            <th>Task</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(t => (
            <tr key={t.taskId}>
              <td>{interns.find(i => i.id === t.internId)?.name}</td>
              <td>{programs.find(p => p.id === t.programId)?.name}</td>
              <td>{t.title}</td>
              <td>{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
