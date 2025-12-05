// components/TaskList.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Task } from "../types/task";

import {
  collection,
  onSnapshot,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc,
  DocumentData,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../components/authProvider";

type Props = { onEdit: (t: Task) => void };

export default function TaskList({ onEdit }: Props) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!user?.email) return;

    const q = query(collection(db, "tasks"), where("userEmail", "==", user.email));
    const unsub = onSnapshot(q, (snap) => {
      const arr: Task[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as DocumentData) })) as Task[];
      setTasks(arr);
    });

    return () => unsub();
  }, [user?.email]);

  const toggleCompleted = async (t: Task) => {
    const tDoc = doc(db, "tasks", t.id);
    await updateDoc(tDoc, { completed: !t.completed });
  };

  const removeTask = async (t: Task) => {
    const tDoc = doc(db, "tasks", t.id);
    await deleteDoc(tDoc);
  };

  if (!user) return null;

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Tasks</h3>
      {tasks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No tasks yet. Create your first task!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((t) => {
            const priorityColors = {
              Low: "bg-green-100 text-green-800",
              Medium: "bg-yellow-100 text-yellow-800",
              High: "bg-red-100 text-red-800"
            };
            
            return (
              <div key={t.id} className={`border rounded-lg p-4 ${t.completed ? 'bg-gray-50 opacity-75' : 'bg-white'} hover:shadow-md transition-shadow`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className={`font-medium ${t.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {t.title}
                      </h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[t.priority]}`}>
                        {t.priority}
                      </span>
                    </div>
                    
                    {t.description && (
                      <p className={`text-sm mb-2 ${t.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                        {t.description}
                      </p>
                    )}
                    
                    {t.dueDate && (
                      <p className="text-xs text-gray-500">
                        Due: {new Date(t.dueDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={t.completed} 
                      onChange={() => toggleCompleted(t)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">Completed</span>
                  </label>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => onEdit(t)}
                      className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => removeTask(t)}
                      className="px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
