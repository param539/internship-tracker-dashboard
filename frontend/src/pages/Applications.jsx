import React, { useState } from "react";
import { applications as sampleApplications } from "../data/sampleData";

export default function Applications() {
  const [apps, setApps] = useState(sampleApplications);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredApps = (sampleApplications || []).filter(app =>
  app.userName?.toLowerCase().includes(search.toLowerCase())
);

  const handleStatusChange = (id, newStatus) => {
    setApps(apps.map((a) => (a.id === id ? { ...a, status: newStatus } : a)));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-3xl font-semibold text-purple-700 mb-6">📄 Applications</h1>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-80"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Status</option>
          <option value="Submitted">Submitted</option>
          <option value="In Review">In Review</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
          <option value="Joined">Joined</option>
        </select>
      </div>

      <table className="w-full bg-white shadow rounded overflow-hidden">
        <thead className="bg-purple-100 text-purple-700">
          <tr>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Program</th>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredApps.map((a) => (
            <tr key={a.id} className="border-b">
              <td className="p-2">{a.name}</td>
              <td className="p-2">{a.email}</td>
              <td className="p-2">{a.program}</td>
              <td className="p-2">{a.date}</td>
              <td className="p-2">{a.status}</td>
              <td className="p-2">
                <select
                  value={a.status}
                  onChange={(e) => handleStatusChange(a.id, e.target.value)}
                  className="border rounded p-1"
                >
                  <option value="Submitted">Submitted</option>
                  <option value="In Review">In Review</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Joined">Joined</option>
                </select>
              </td>
            </tr>
          ))}
          {filteredApps.length === 0 && (
            <tr>
              <td colSpan="6" className="p-4 text-center text-gray-500">
                No applications found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}