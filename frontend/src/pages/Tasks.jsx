import React, { useState } from "react";
import { tasks as sampleTasks } from "../data/sampleTasks";

export default function Tasks() {
  const [tasks, setTasks] = useState(sampleTasks);

  const markComplete = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, progress: 100 } : t))
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-3xl font-semibold text-purple-700 mb-6">✅ Intern Tasks & Progress</h1>

      <div className="grid gap-4">
        {tasks.map((t) => (
          <div key={t.id} className="bg-white p-4 rounded shadow">
            <h2 className="font-bold text-purple-700">{t.title} - {t.intern}</h2>
            <p className="text-gray-600">{t.description}</p>
            <p className="text-gray-500 text-sm">Deadline: {t.deadline}</p>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
              <div
                className="bg-purple-600 h-4 rounded-full"
                style={{ width: `${t.progress}%` }}
              ></div>
            </div>
            <button
              className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
              onClick={() => markComplete(t.id)}
            >
              Mark Complete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}