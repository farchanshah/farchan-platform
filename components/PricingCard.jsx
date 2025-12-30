import { motion } from 'framer-motion'

export default function PricingCard({ title, desc, price, highlight }) {
  return (
    <motion.article layout className="card">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{title}</h3>
        {highlight && <span className="text-sm px-2 py-1 bg-yellow-100 rounded">{highlight}</span>}
      </div>
      <p className="mt-3 text-gray-600">{desc}</p>
      <div className="mt-6 flex items-center justify-between">
        <div className="text-lg font-bold">{price}</div>
        <a href="/contact" className="btn btn-dark">Pesan (DP 30%)</a>
      </div>
    </motion.article>
  )
}
