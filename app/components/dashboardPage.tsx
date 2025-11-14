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
      <main>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1>Hello, {user?.email}</h1>
          <button onClick={() => signOut(auth).then(() => window.location.href = "/login")}>Logout</button>
        </header>

        <section style={{ marginTop: 20 }}>
          <h2>{editing ? "Edit Task" : "Add Task"}</h2>
          <TaskForm editingTask={editing} onSaved={onSaved} />
        </section>

        <section style={{ marginTop: 20 }}>
          <TaskList onEdit={(t) => setEditing(t)} />
        </section>
      </main>
    </AuthGate>
  );
}
