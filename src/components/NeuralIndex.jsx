import { motion } from 'framer-motion'

const items = [
  { id: 'core', label: 'I. THE ALGORITHMIC CORE' },
  { id: 'portfolio', label: 'II. THE HYPER-REALITY PORTFOLIO' },
  { id: 'studio', label: 'III. THE SYNTHETIC STUDIO' },
  { id: 'collective', label: 'IV. THE HUMAN/MACHINE COLLECTIVE' },
]

export default function NeuralIndex({ active, onSelect }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div className="mx-4 mt-4 rounded-2xl bg-white/8 backdrop-blur-xl border border-white/20 shadow-[0_10px_60px_rgba(168,255,250,0.15)]">
        <nav className="flex items-center justify-between px-4 sm:px-6 md:px-8 h-16">
          <div className="font-semibold tracking-widest text-xs sm:text-sm uppercase text-white/90">
            Glido Labs
          </div>
          <ul className="relative hidden md:flex items-center gap-6 lg:gap-10 text-[10px] sm:text-xs tracking-widest uppercase text-white/70">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onSelect(item.id)}
                  className="relative py-2 px-2 lg:px-3 hover:text-white/95 transition-colors"
                  aria-label={item.label}
                >
                  <span>{item.label}</span>
                  {active === item.id && (
                    <motion.span
                      layoutId="active-underline"
                      className="absolute left-0 right-0 -bottom-1 h-px bg-gradient-to-r from-cyan-300/60 via-white/80 to-fuchsia-300/60"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
          {/* Mobile menu: reduce to dots */}
          <div className="md:hidden flex items-center gap-3">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                aria-label={item.label}
                className="group relative"
              >
                <motion.div
                  className="h-2.5 w-2.5 rounded-full border border-white/50 bg-white/10"
                  animate={{ scale: active === item.id ? 1.2 : 1, boxShadow: active === item.id ? '0 0 18px rgba(168,255,250,0.65)' : '0 0 8px rgba(255,255,255,0.25)' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                />
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}
