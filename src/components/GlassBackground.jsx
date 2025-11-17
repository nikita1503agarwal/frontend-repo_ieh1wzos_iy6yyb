export default function GlassBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-[radial-gradient(1000px_700px_at_-10%_-20%,rgba(255,255,255,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_120%_120%,rgba(168,255,250,0.12),transparent_60%)]" />
      <div className="absolute inset-0 backdrop-blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-white/4 to-white/2" />
    </div>
  )
}
