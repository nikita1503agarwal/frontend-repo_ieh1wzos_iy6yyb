import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

function Layer({ depth = 0, children }) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 110, damping: 18 })
  const y = useSpring(my, { stiffness: 110, damping: 18 })

  useEffect(() => {
    const onMove = (e) => {
      const { innerWidth, innerHeight } = window
      const nx = (e.clientX / innerWidth - 0.5) * 2
      const ny = (e.clientY / innerHeight - 0.5) * 2
      mx.set(-nx * depth * 30)
      my.set(-ny * depth * 30)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [depth, mx, my])

  return (
    <motion.div style={{ x, y }} className="pointer-events-none">
      {children}
    </motion.div>
  )
}

function GlassCard({ title, subtitle, intensity = 0.2, children }) {
  return (
    <div className="relative p-6 sm:p-8 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_20px_80px_rgba(0,0,0,0.35)]">
      <div className="absolute inset-0 rounded-2xl" style={{
        background: `radial-gradient(1000px 600px at 10% -10%, rgba(255,255,255,${intensity}) 0%, transparent 60%), radial-gradient(800px 500px at 110% 120%, rgba(168, 255, 250, ${intensity}) 0%, transparent 60%)`
      }} />
      <div className="relative">
        <h3 className="text-xl sm:text-2xl font-semibold text-white/90">{title}</h3>
        <p className="text-white/60 mt-1 mb-4">{subtitle}</p>
        {children}
      </div>
    </div>
  )
}

// Simple shader-like canvases simulated with canvas API for now
function LSystemCanvas() {
  useEffect(() => {
    const canvas = document.getElementById('lsys')
    const ctx = canvas.getContext('2d')
    let t = 0
    const dpr = window.devicePixelRatio || 1
    const resize = () => {
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const rule = (x, y, s, a) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(a)
      ctx.scale(s, s)
      ctx.beginPath()
      for (let i = 0; i < 120; i++) {
        const r = i * 2
        const th = i * 0.22
        ctx.lineTo(Math.cos(th) * r, Math.sin(th) * r)
      }
      ctx.strokeStyle = 'rgba(168,255,250,0.8)'
      ctx.shadowColor = 'rgba(255,255,255,0.6)'
      ctx.shadowBlur = 20
      ctx.lineWidth = 1.3
      ctx.stroke()
      ctx.restore()
    }
    const loop = () => {
      t += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      for (let i = 0; i < 6; i++) {
        const a = t + i * Math.PI / 3
        const s = 0.7 + Math.sin(t + i) * 0.15
        rule(cx + Math.cos(a) * 100, cy + Math.sin(a) * 60, s, a)
      }
      raf = requestAnimationFrame(loop)
    }
    let raf = requestAnimationFrame(loop)
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas id="lsys" className="w-full h-56 sm:h-64 md:h-72 rounded-xl bg-black/30" />
}

function NonEuclideanCanvas() {
  useEffect(() => {
    const canvas = document.getElementById('non-eu')
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const resize = () => {
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    let t = 0
    const loop = () => {
      t += 0.008
      ctx.clearRect(0,0,canvas.width,canvas.height)
      for (let y=0; y<canvas.height; y+=3) {
        const hue = (y/4 + t*200) % 360
        ctx.fillStyle = `hsla(${hue}, 80%, 60%, 0.25)`
        const warp = Math.sin(y*0.02 + Math.sin(t)*3) * 40
        ctx.fillRect(warp + Math.sin(t+y*0.01)*20 + 20, y, canvas.width, 2)
      }
      raf = requestAnimationFrame(loop)
    }
    let raf = requestAnimationFrame(loop)
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas id="non-eu" className="w-full h-40 sm:h-48 md:h-56 rounded-xl bg-black/30" />
}

function FluidCanvas() {
  useEffect(() => {
    const canvas = document.getElementById('fluid')
    const ctx = canvas.getContext('2d')
    let t = 0
    const dpr = window.devicePixelRatio || 1
    const resize = () => {
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const loop = () => {
      t += 0.01
      ctx.fillStyle = 'rgba(0,0,0,0.18)'
      ctx.fillRect(0,0,canvas.width, canvas.height)
      const cx = canvas.width/2, cy = canvas.height/2
      for (let i=0;i<140;i++){
        const a = t*2 + i*0.2
        const r = 40 + Math.sin(t+i*0.3)*30
        const x = cx + Math.cos(a)*r*2
        const y = cy + Math.sin(a*1.3)*r
        ctx.beginPath()
        ctx.arc(x,y, 2 + Math.sin(t+i)*1.5, 0, Math.PI*2)
        ctx.fillStyle = `hsla(${(i*3+t*120)%360}, 85%, 70%, 0.6)`
        ctx.shadowColor = 'rgba(255,255,255,0.8)'
        ctx.shadowBlur = 16
        ctx.fill()
      }
      requestAnimationFrame(loop)
    }
    const raf = requestAnimationFrame(loop)
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas id="fluid" className="w-full h-40 sm:h-48 md:h-56 rounded-xl bg-black/30" />
}

export default function Experiments() {
  return (
    <section className="relative min-h-screen py-24 px-8 md:px-16 lg:px-24">
      <div className="absolute inset-0 -z-0">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(1000px 700px at -20% 10%, rgba(255,255,255,0.08), transparent 60%), radial-gradient(1000px 700px at 120% 90%, rgba(168,255,250,0.08), transparent 60%)'
        }} />
      </div>

      <Layer depth={0.4}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GlassCard title="Dynamic L‑System Growth" subtitle="Visualizing asset generation pathways">
            <LSystemCanvas />
          </GlassCard>
          <GlassCard title="Non‑Euclidean Rendering" subtitle="A campaign that shifts perspective as you watch">
            <NonEuclideanCanvas />
          </GlassCard>
          <GlassCard title="Fluid Dynamics Engine" subtitle="Interactive product photography lighting model">
            <FluidCanvas />
          </GlassCard>
          <GlassCard title="Magnetic Field Interface" subtitle="Cursor as attractor across layered glass planes">
            <div className="h-40 sm:h-48 md:h-56 rounded-xl bg-gradient-to-br from-cyan-300/20 to-fuchsia-400/20" />
          </GlassCard>
        </div>
      </Layer>
    </section>
  )
}
