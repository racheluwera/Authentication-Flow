// components/TaskForm.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Task } from "../types/task";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../components/authProvider";

type Props = {
  editingTask?: Task | null;
  onSaved?: () => void;
};

export default function TaskForm({ editingTask = null, onSaved }: Props) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Low");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
    } else {
      setTitle("");
      setDescription("");
      setPriority("Low");
    }
  }, [editingTask]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const tasksCol = collection(db, "tasks");
    try {
      if (editingTask) {
        const tDoc = doc(db, "tasks", editingTask.id);
        await updateDoc(tDoc, { title, description, priority });
      } else {
        await addDoc(tasksCol, {
          title,
          description,
          priority,
          completed: false,
          userEmail: user.email,
        });
      }
      onSaved?.();
      // reset if desired
      if (!editingTask) {
        setTitle("");
        setDescription("");
        setPriority("Low");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleCreate}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <select value={priority} onChange={(e) => setPriority(e.target.value as any)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <button type="submit">{editingTask ? "Update Task" : "Add Task"}</button>
    </form>
  );
}
