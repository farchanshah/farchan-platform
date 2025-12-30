export default function Testimonials({ items = [] }) {
  return (
    <section className="py-12 bg-white">
      <div className="container-max">
        <h2 className="text-2xl font-semibold mb-6">Apa kata klien</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {items.map((t,idx) => (
            <div key={idx} className="card">
              <p className="text-gray-700">"{t.quote}"</p>
              <div className="mt-3 font-medium">{t.name}</div>
              <div className="text-sm text-gray-500">{t.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
