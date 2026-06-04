import { motion } from 'framer-motion'
import BrushedMetal from './BrushedMetal'

export default function MetalCard({
  children,
  className = '',
  glow = 'none',
  as: Tag = motion.div,
  delay = 0,
  hover = true,
}) {
  const glowMap = {
    purple: 'hover:shadow-[0_0_60px_-10px_rgba(170,59,255,0.55)]',
    cyan: 'hover:shadow-[0_0_60px_-10px_rgba(0,255,255,0.55)]',
    pink: 'hover:shadow-[0_0_60px_-10px_rgba(255,80,200,0.55)]',
    none: '',
  }

  return (
    <Tag
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover={hover ? { y: -4 } : undefined}
      className={`group relative overflow-hidden rounded-2xl ${glowMap[glow]} transition-shadow duration-500 ${className}`}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-zinc-700/70 via-zinc-900/60 to-black" />
      <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(255,255,255,0.18),transparent_60%)]" />
      <BrushedMetal />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      <div className="absolute inset-[1px] rounded-[15px] border-t border-l border-white/15 border-b border-black/50 border-r border-black/40" />
      <div className="absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_2px_rgba(255,255,255,0.12),inset_0_-2px_4px_rgba(0,0,0,0.45)]" />
      <div className="relative z-10 p-8 md:p-10">{children}</div>
    </Tag>
  )
}
