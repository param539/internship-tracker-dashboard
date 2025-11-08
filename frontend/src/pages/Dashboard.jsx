import React from "react";
import { programs, applications, progressData } from "../data/sampleData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function Dashboard() {
  const selected = applications.filter(a => a.status === "Selected").length;
  const pending = applications.filter(a => a.status === "Pending").length;
  const rejected = applications.filter(a => a.status === "Rejected").length;

  return (
    <div className="p-6 font-sans">
      <h1 className="text-3xl font-semibold text-purple-700 mb-4">🌸 Internship Tracker Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-purple-100 p-4 rounded-lg shadow">
          <p>Total Programs</p>
          <h2 className="text-2xl font-bold">{programs.length}</h2>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <p>Applications Received</p>
          <h2 className="text-2xl font-bold">{applications.length}</h2>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <p>Selected Interns</p>
          <h2 className="text-2xl font-bold">{selected}</h2>
        </div>
      </div>

      <h2 className="text-xl text-gray-700 mb-2">📊 Progress Overview</h2>
      <LineChart width={600} height={300} data={progressData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="tasksDone" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}