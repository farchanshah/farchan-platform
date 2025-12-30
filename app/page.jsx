import Hero from '../components/Hero'
import ServiceCard from '../components/ServiceCard'
import Footer from '../components/Footer'

const services = [
  { title: 'Web Development', desc: 'Website statis/dinamis, e-commerce, integrasi.' },
  { title: 'Image Editing', desc: 'Retouch, mockup, banner iklan.' },
  { title: 'Admin & Ads', desc: 'Pengurusan domain, hosting, dan iklan.' }
]

export default function Home(){
  return (
    <main className="min-h-screen">
      <Hero />

      <section id="services" className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 p-6">
        {services.map(s => <ServiceCard key={s.title} {...s} />)}
      </section>

      <Footer />
    </main>
  )
}
