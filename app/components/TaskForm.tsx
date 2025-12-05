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
  const [title, setTitle] = useState(editingTask?.title || "");
  const [description, setDescription] = useState(editingTask?.description || "");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">(editingTask?.priority || "Low");
  const [dueDate, setDueDate] = useState(editingTask?.dueDate || "");

  // Form will reset when editingTask changes via key prop

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const tasksCol = collection(db, "tasks");
    try {
      if (editingTask) {
        const tDoc = doc(db, "tasks", editingTask.id);
        await updateDoc(tDoc, { title, description, priority, dueDate });
      } else {
        await addDoc(tasksCol, {
          title,
          description,
          priority,
          dueDate,
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
        setDueDate("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleCreate} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Enter task title" 
          required 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Enter task description" 
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select 
            value={priority} 
            onChange={(e) => setPriority(e.target.value as "Low" | "Medium" | "High")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
          <input 
            type="date" 
            value={dueDate} 
            onChange={(e) => setDueDate(e.target.value)} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {editingTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}
