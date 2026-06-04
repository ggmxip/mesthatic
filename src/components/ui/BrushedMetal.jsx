export default function BrushedMetal({ className = '' }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 rounded-2xl mix-blend-overlay opacity-50 ${className}`}
      style={{
        backgroundImage:
          'repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 3px)',
      }}
    />
  )
}
