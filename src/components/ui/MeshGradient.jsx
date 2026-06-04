import { motion } from 'framer-motion'

export default function MeshGradient({ className = '' }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <motion.div
        className="absolute -inset-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        style={{
          background:
            'radial-gradient(40% 40% at 25% 30%, rgba(170,59,255,0.22), transparent 60%), radial-gradient(35% 35% at 75% 65%, rgba(0,255,255,0.18), transparent 65%), radial-gradient(30% 30% at 50% 90%, rgba(255,80,200,0.14), transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <motion.div
        className="absolute -inset-1/2"
        animate={{ x: [0, 40, -30, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(25% 25% at 80% 20%, rgba(0,255,255,0.10), transparent 60%), radial-gradient(20% 20% at 20% 80%, rgba(170,59,255,0.10), transparent 65%)',
          filter: 'blur(50px)',
        }}
      />
    </div>
  )
}
