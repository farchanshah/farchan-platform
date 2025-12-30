import { prisma } from '../../lib/db'

export default async function Admin(){
  // server component — simple fetch of projects
  let projects = []
  try{
    projects = await prisma.project.findMany({ include: { client: true } })
  }catch(e){
    // prisma may not be available during dev before env set
    projects = []
  }

  return (
    <main className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="mt-6">
        {projects.length === 0 ? <p>No projects yet</p> : (
          projects.map(p => (
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
