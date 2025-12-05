// app/dashboard/page.tsx
"use client";

import React, { useState } from "react";
import AuthGate from "./AutGates";
import { useAuth } from "./authProvider"
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
// import { Task } from "../api/task/[id]/route";
import { Task } from "../types/task";

export default function DashboardPage() {
  const { user } = useAuth();
  const [editing, setEditing] = useState<Task | null>(null);

  const onSaved = () => setEditing(null);

  return (
    <AuthGate>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
                <p className="text-sm text-gray-600">Welcome back, {user?.email}</p>
              </div>
              <button 
                onClick={() => signOut(auth).then(() => window.location.href = "/login")}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Task Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {editing ? "Edit Task" : "Add New Task"}
              </h2>
              <TaskForm key={editing?.id || 'new'} editingTask={editing} onSaved={onSaved} />
              {editing && (
                <button 
                  onClick={() => setEditing(null)}
                  className="mt-4 text-gray-600 hover:text-gray-800 text-sm"
                >
                  Cancel editing
                </button>
              )}
            </div>

            {/* Task List */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <TaskList onEdit={(t) => setEditing(t)} />
            </div>
          </div>
        </main>
      </div>
    </AuthGate>
  );
}
