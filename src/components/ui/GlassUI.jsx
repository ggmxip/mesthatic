import { motion } from 'framer-motion'

export default function GlassUI() {
  return (
    <div className="relative z-10 flex items-center justify-center h-full pointer-events-none">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pointer-events-auto p-10 rounded-3xl border border-white/10 border-t-white/30 border-l-white/20 bg-white/5 backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.05)] hover:-translate-y-1 hover:shadow-[0_15px_45px_0_rgba(0,0,0,0.7),inset_0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300"
      >
        <h1 className="text-5xl font-extrabold tracking-tighter mb-2 bg-gradient-to-br from-white to-neutral-500 bg-clip-text text-transparent">
          esc.
        </h1>
        <p className="text-neutral-400 tracking-widest text-sm uppercase">
          Dev_Environment
        </p>
      </motion.div>
    </div>
  )
}