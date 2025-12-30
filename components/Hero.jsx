import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#f8fafc]">
      <div className="container-max grid md:grid-cols-2 gap-8 items-center">
        <motion.div initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} transition={{duration:0.6}}>
          <h1 className="text-4xl md:text-5xl font-serif leading-tight">Saya Farchan Shah — Web Developer & Visual Editor</h1>
          <p className="mt-4 text-lg max-w-xl">
            Membangun website yang elegan, cepat, dan siap scale. Kami bantu dari desain, development, hingga pengelolaan administrasi dan iklan.
          </p>

          <div className="mt-6 flex gap-3">
            <a href="/contact" className="btn btn-dark">Mulai Proyek</a>
            <a href="/pricing" className="btn btn-outline">Lihat Paket</a>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <strong>DP:</strong> 30–50% — fleksibel berdasarkan kompleksitas.
          </div>
        </motion.div>

        <motion.div initial={{opacity:0, scale:0.98}} animate={{opacity:1, scale:1}} transition={{duration:0.6}}>
          <div className="card">
            <img src="/hero-sample.jpg" alt="Contoh project" className="w-full rounded-md object-cover h-56" />
            <div className="mt-4">
              <h4 className="font-semibold">Contoh: Website Toko Online</h4>
              <p className="text-sm text-gray-600 mt-1">MVP e-commerce + CMS + optimasi SEO + pengaturan iklan.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
