'use client'
import { useState } from 'react'

export default function Login(){
  const [email,setEmail] = useState('')
  const [pass,setPass] = useState('')
  const [msg,setMsg] = useState(null)

  async function submit(e){
    e.preventDefault()
    const res = await fetch('/api/auth/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email,password:pass})})
    if(res.ok) window.location.href = '/dashboard'
    else setMsg('Login gagal')
  }

  return (
    <main className="max-w-sm mx-auto py-20">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full border p-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full border p-2" type="password" placeholder="Password" value={pass} onChange={e=>setPass(e.target.value)} />
        <button className="bg-dark text-white px-4 py-2 rounded">Login</button>
      </form>
      {msg && <p className="mt-3 text-red-600">{msg}</p>}
    </main>
  )
}
