export default function PortfolioGrid({ items = [] }) {
  return (
    <section className="py-12">
      <div className="container-max">
        <h2 className="text-2xl font-semibold mb-4">Portofolio</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map(i => (
            <div key={i.title} className="card">
              <img src={i.image} alt={i.title} className="w-full h-40 object-cover rounded" />
              <h3 className="mt-3 font-semibold">{i.title}</h3>
              <p className="text-sm text-gray-600">{i.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
