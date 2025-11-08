// // Users
// export const users = [
//   { id: 1, name: "Alice", email: "alice@example.com", role: "Admin" },
//   { id: 2, name: "Bob", email: "bob@example.com", role: "Supervisor" },
//   { id: 3, name: "Charlie", email: "charlie@example.com", role: "Intern" },
// ];

// // Internship Programs
// export const programs = [
//   { id: 1, name: "Frontend Development", applicants: 12, deadline: "2025-11-30", status: "Active" },
//   { id: 2, name: "Data Science", applicants: 8, deadline: "2025-12-15", status: "Active" },
//   { id: 3, name: "Cybersecurity", applicants: 5, deadline: "2025-12-01", status: "Inactive" },
// ];

// // Applications
// export const applications = [
//   { id: 1, name: "Alice", email: "alice@example.com", program: "Frontend Development", status: "Submitted", date: "2025-10-20" },
//   { id: 2, name: "Bob", email: "bob@example.com", program: "Data Science", status: "Accepted", date: "2025-10-18" },
// ];
// // src/data/sampleData.js
// export const progressData = [
//   { month: "Jan", applications: 5 },
//   { month: "Feb", applications: 10 },
//   { month: "Mar", applications: 7 },
//   { month: "Apr", applications: 12 },
// ];
// src/data/sampleData.js

export let users = [
  // Users who signed up but not selected yet
  { id: 1, name: "Alice", email: "alice@example.com", password: "1234", role: "User", appliedProgramId: null, internId: null },
  { id: 2, name: "Bob", email: "bob@example.com", password: "1234", role: "Intern", appliedProgramId: 1, internId: 101 },
  // Admin
  { id: 1000, name: "Admin", email: "admin@example.com", password: "admin123", role: "Admin" },
];

export let programs = [
  { id: 1, name: "Frontend Development", description: "Learn React", deadline: "2025-11-15", applicants: [], status: "Active" },
  { id: 2, name: "Backend Development", description: "Learn Node.js", deadline: "2025-11-20", applicants: [], status: "Active" },
];

export let tasks = [
  // Tasks assigned to interns
  { id: 1, internId: 101, title: "Build Landing Page", description: "Create responsive landing page", deadline: "2025-11-01", progress: 50 },
];

export let progressData = [
  { month: "Oct", applications: 5 },
  { month: "Nov", applications: 8 },
];
// src/data/sampleData.js

export let applications = [
  { id: 1, userId: 1, programId: 1, status: "Submitted", date: "2025-10-22" },
  { id: 2, userId: 2, programId: 2, status: "Accepted", date: "2025-10-21" },
];