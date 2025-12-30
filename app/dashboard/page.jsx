import Footer from '../../components/Footer'

export default function Dashboard(){
  return (
    <main className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-4">Ini area klien — daftar project dan status akan muncul di sini.</p>

      <div className="mt-8 grid grid-cols-3 gap-6">
        <div className="p-6 border rounded">Active Projects</div>
        <div className="p-6 border rounded">Invoices</div>
        <div className="p-6 border rounded">Support</div>
      </div>

      <Footer />
    </main>
  )
}
