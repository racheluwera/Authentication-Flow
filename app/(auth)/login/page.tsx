
'use client'
import { useState } from 'react'
import { signInWithEmailAndPassword, AuthError } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import { useRouter } from 'next/navigation' // App Router


export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Debug: Check if email/password are not empty
    console.log('Login attempt:', { email, password: password ? '***' : 'empty' })
    
    if (!email || !password) {
      alert('Please enter both email and password')
      return
    }
    
    try {
      await signInWithEmailAndPassword(auth, email, password)
      alert('Logged in successfully!')
      router.push('/dashboard') // redirect after login
    } catch (error) {
      const authError = error as AuthError
      console.error('Login error:', authError)
      alert(`Login failed: ${authError.message}`)
    }
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4 w-64">
        <input type="email" placeholder="Email" className="w-full border p-2" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full border p-2" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full bg-blue-500 text-white p-2 rounded" type="submit">Login</button>
      </form>
      <button
        className="mt-4 text-sm text-blue-600"
        onClick={() => router.push('/register')} // redirect to register page
      >
        Do not have an account? Register
      </button>
    </div>
  )
}


