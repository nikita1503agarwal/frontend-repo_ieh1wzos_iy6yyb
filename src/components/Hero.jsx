import Spline from '@splinetool/react-spline'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'

export default function Hero({ onMagnet }) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 120, damping: 20 })
  const sy = useSpring(my, { stiffness: 120, damping: 20 })

  useEffect(() => {
    const handle = (e) => {
      const { innerWidth, innerHeight } = window
      mx.set((e.clientX / innerWidth - 0.5) * 2)
      my.set((e.clientY / innerHeight - 0.5) * 2)
      onMagnet?.(e)
    }
    window.addEventListener('pointermove', handle)
    return () => window.removeEventListener('pointermove', handle)
  }, [mx, my, onMagnet])

  const rotate = useTransform(sx, [ -1, 1 ], [ -6, 6 ])
  const translate = useTransform(sy, [ -1, 1 ], [ 20, -20 ])

  return (
    <section className="relative h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/jdTN4VDCXmSY8utE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/10 via-fuchsia-300/10 to-blue-300/10 pointer-events-none" />
      <motion.div
        className="relative h-full flex items-center justify-center text-center"
        style={{ rotateX: rotate, y: translate }}
      >
        <div className="max-w-4xl px-8">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-200 to-fuchsia-300 text-5xl sm:text-6xl md:text-7xl font-extrabold drop-shadow-[0_6px_40px_rgba(255,255,255,0.35)]">
            Glido Labs: Synthetic Reality Portal
          </h1>
          <p className="mt-6 text-white/80 text-base sm:text-lg md:text-xl tracking-wide">
            An extreme glassmorphic showcase for AI-first media. Explore the Algorithmic Core, the Hyper-Reality Portfolio, the Synthetic Studio, and the Human/Machine Collective.
          </p>
        </div>
      </motion.div>
    </section>
  )
}
