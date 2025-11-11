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
      <h3>Your tasks</h3>
      {tasks.length === 0 && <p>No tasks yet.</p>}
      <ul>
        {tasks.map((t) => (
          <li key={t.id} style={{ border: "1px solid #ddd", padding: 8, marginBottom: 6 }}>
            <div><strong>{t.title}</strong> ({t.priority})</div>
            <div>{t.description}</div>
            <div>
              <label>
                Completed:
                <input type="checkbox" checked={t.completed} onChange={() => toggleCompleted(t)} />
              </label>
              <button onClick={() => onEdit(t)}>Edit</button>
              <button onClick={() => removeTask(t)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
