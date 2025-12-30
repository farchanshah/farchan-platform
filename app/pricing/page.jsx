export default function Pricing(){
  return (
    <main className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-3xl font-bold">Paket & Harga</h1>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="p-6 border rounded">Starter<br/>IDR 5.000.000</div>
        <div className="p-6 border rounded">Growth<br/>IDR 15.000.000</div>
        <div className="p-6 border rounded">Enterprise<br/>Custom</div>
      </div>
    </main>
  )
}
