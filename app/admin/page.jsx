// app/admin/page.jsx
import React from 'react'

export default async function Admin() {
  let projects = []
  try {
    const { getPrisma } = require('../../lib/db')
    const prisma = getPrisma()
    if (prisma) {
      projects = await prisma.project.findMany({ include: { client: true } })
    }
  } catch (e) {
    console.warn('Admin page error:', e?.message || e)
    projects = []
  }

  return (
    <main className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="mt-6">
        {projects.length === 0 ? (
          <p>No projects yet</p>
        ) : (
          projects.map((p) => (
            <div key={p.id} className="border p-4 my-2 rounded">
              <h2 className="font-semibold">{p.title}</h2>
              <p>Client: {p.client?.email}</p>
              <p>Status: {p.status}</p>
            </div>
          ))
        )}
      </div>
    </main>
  )
}
