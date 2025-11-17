import { motion } from 'framer-motion'

const items = [
  { id: 'core', label: 'I. THE ALGORITHMIC CORE' },
  { id: 'portfolio', label: 'II. THE HYPER-REALITY PORTFOLIO' },
  { id: 'studio', label: 'III. THE SYNTHETIC STUDIO' },
  { id: 'collective', label: 'IV. THE HUMAN/MACHINE COLLECTIVE' },
]

export default function NeuralIndex({ active, onSelect }) {
  return (
    <div className="fixed left-0 top-0 h-screen w-20 sm:w-24 flex items-center z-40">
      <div className="relative h-[80%] w-px mx-auto bg-white/15 backdrop-blur-lg rounded-full overflow-visible">
        <div className="absolute inset-0 -left-[1px] w-[3px] bg-gradient-to-b from-cyan-300/60 via-white/60 to-fuchsia-300/60 blur-[2px] opacity-60" />
      </div>
      <ul className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 space-y-10">
        {items.map((item) => (
          <li key={item.id} className="select-none">
            <button
              onClick={() => onSelect(item.id)}
              className="group relative"
              aria-label={item.label}
            >
              <motion.div
                className="h-3 w-3 rounded-full border border-white/50 bg-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.35)]"
                animate={{ scale: active === item.id ? 1.25 : 1, boxShadow: active === item.id ? '0 0 28px rgba(168, 255, 250, 0.65)' : '0 0 14px rgba(255,255,255,0.25)' }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              />
              <span className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] sm:text-xs tracking-widest uppercase text-white/70 group-hover:text-white/95 transition-colors">
                {item.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
