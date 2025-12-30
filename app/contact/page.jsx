'use client'
import { useState } from 'react'

export default function Contact(){
  const [form,setForm] = useState({name:'',email:'',message:''})
  const [status,setStatus] = useState(null)

  async function submit(e){
    e.preventDefault()
    setStatus('loading')
    const res = await fetch('/api/contact',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(form)})
    setStatus(res.ok ? 'sent' : 'error')
  }

  return (
    <main className="max-w-xl mx-auto py-20">
      <h1 className="text-2xl font-bold mb-4">Contact</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full border p-2" placeholder="Nama" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <input className="w-full border p-2" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <textarea className="w-full border p-2" placeholder="Pesan" value={form.message} onChange={e=>setForm({...form,message:e.target.value})}></textarea>
        <button className="bg-dark text-white px-4 py-2 rounded">Send</button>
      </form>
      {status==='sent' && <p className="mt-4 text-green-600">Terima kasih! Kami akan menghubungi Anda.</p>}
      {status==='error' && <p className="mt-4 text-red-600">Terjadi kesalahan, coba lagi.</p>}
    </main>
  )
}
