import { useState } from 'react'
import NeuralIndex from './components/NeuralIndex'
import GlassBackground from './components/GlassBackground'
import Hero from './components/Hero'
import Experiments from './components/Experiments'

function App() {
  const [active, setActive] = useState('core')

  const handleSelect = (id) => {
    setActive(id)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <div className="relative min-h-screen text-white bg-black">
      <GlassBackground />
      <NeuralIndex active={active} onSelect={handleSelect} />

      <main className="relative z-10">
        <section id="core" className="min-h-screen">
          <Hero />
        </section>

        <section id="portfolio" className="min-h-screen">
          <Experiments />
        </section>

        <section id="studio" className="min-h-screen py-32 px-8 md:px-16 lg:px-24">
          <div className="max-w-5xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white via-cyan-200 to-fuchsia-300">The Synthetic Studio</h2>
            <p className="mt-4 text-white/70 max-w-2xl">Ads that shape-shift, photography that bends light. Engage with our fluid engine to re‑light products in real‑time and conjure scenes that don’t obey Euclid.</p>
          </div>
        </section>

        <section id="collective" className="min-h-screen py-32 px-8 md:px-16 lg:px-24">
          <div className="max-w-4xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white via-cyan-200 to-fuchsia-300">The Human/Machine Collective</h2>
            <p className="mt-4 text-white/70">Glido Labs is a coalition of artists, scientists, and autonomous agents refining perception itself. Contact us to commission synthetic realities.</p>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input placeholder="Name" className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-300/50" />
              <input placeholder="Email" className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-300/50" />
              <textarea placeholder="Tell us about your project" rows={4} className="sm:col-span-2 px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-300/50" />
              <button className="w-fit px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-fuchsia-400 text-black font-semibold shadow-[0_10px_40px_rgba(168,255,250,0.4)]">Initiate Transmission</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
