
"use client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/"); 
    } catch (error) {
        console.log("Login failed");
    
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Login</h1>
        <input required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input" />
        <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="input" />
        <button className="btn" type="submit">Login</button>
        {err && <p className="text-red-500">{err}</p>}
      </form>
    </main>
  );
}
