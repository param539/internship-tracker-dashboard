import React, { useState } from "react";
import { programs as samplePrograms } from "../data/sampleData";

export default function Programs() {
  const [programs, setPrograms] = useState(samplePrograms);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [newProgram, setNewProgram] = useState({
    name: "",
    description: "",
    deadline: "",
    status: "Active",
  });

  const filteredPrograms = programs.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Add new program
  const handleAddProgram = () => {
    const nextId = programs.length ? programs[programs.length - 1].id + 1 : 1;
    setPrograms([...programs, { id: nextId, ...newProgram, applicants: 0 }]);
    setModalOpen(false);
    setNewProgram({ name: "", description: "", deadline: "", status: "Active" });
  };

  // Delete program
  const handleDelete = (id) => {
    setPrograms(programs.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6 font-sans bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-purple-700">🌸 Internship Programs</h1>
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
          onClick={() => setModalOpen(true)}
        >
          + Add Program
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search program..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
        />
      </div>

      {/* Program Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrograms.length === 0 ? (
          <p className="text-gray-500">No programs found...</p>
        ) : (
          filteredPrograms.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition-all border-l-4 border-purple-400"
            >
              <h2 className="text-xl font-bold text-purple-700">{p.name}</h2>
              <p className="text-gray-600 mt-2">{p.description || "No description"}</p>
              <p className="text-gray-600 mt-1">Applicants: {p.applicants}</p>
              <p className="text-gray-600">Deadline: {p.deadline}</p>
              <p
                className={`mt-3 inline-block px-3 py-1 rounded-full text-sm ${
                  p.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {p.status}
              </p>

              <div className="mt-4 flex gap-2">
                <button className="flex-1 bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition">
                  View Details
                </button>
                <button
                  className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Program Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
            <h2 className="text-xl font-bold text-purple-700 mb-4">Add New Program</h2>
            <input
              type="text"
              placeholder="Program Name"
              value={newProgram.name}
              onChange={(e) => setNewProgram({ ...newProgram, name: e.target.value })}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              placeholder="Description"
              value={newProgram.description}
              onChange={(e) => setNewProgram({ ...newProgram, description: e.target.value })}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="date"
              placeholder="Deadline"
              value={newProgram.deadline}
              onChange={(e) => setNewProgram({ ...newProgram, deadline: e.target.value })}
              className="w-full p-2 mb-2 border rounded"
            />
            <select
              value={newProgram.status}
              onChange={(e) => setNewProgram({ ...newProgram, status: e.target.value })}
              className="w-full p-2 mb-4 border rounded"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                onClick={handleAddProgram}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}