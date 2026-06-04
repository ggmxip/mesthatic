import { motion } from 'framer-motion'
import { profile } from '../../data/resume'
import BrushedMetal from '../ui/BrushedMetal'

const section = (extra = '') =>
  `min-h-screen w-full flex flex-col items-center justify-center px-6 md:px-24 relative ${extra}`

function Chevron() {
  return (
    <motion.div
      aria-hidden
      className="absolute bottom-10 flex flex-col items-center gap-2 text-zinc-500"
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <span className="text-[10px] tracking-[0.4em] uppercase font-mono">Scroll</span>
      <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
        <path
          d="M7 1V20M7 20L1 14M7 20L13 14"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section id="hero" className={section('pointer-events-auto')}>
      <BrushedMetal />
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-10 text-center"
      >
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm px-4 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-300">
            {profile.status}
          </span>
        </div>

        <div className="relative isolate px-3 py-2 sm:px-6">
          <div
            aria-hidden
            className="absolute inset-x-[-8%] top-1/2 -z-10 h-[58%] -translate-y-1/2 rounded-full bg-black/55 blur-3xl"
          />
          <h1 className="hero-handle select-none cursor-default whitespace-nowrap">
            {profile.handle}
          </h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-base md:text-xl text-zinc-300 max-w-2xl leading-relaxed"
        >
          <span className="text-white font-medium">{profile.name}</span> ·{' '}
          {profile.role} @{' '}
          <span className="text-white font-medium">{profile.company}</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.8 }}
          className="text-sm md:text-base text-zinc-500 max-w-xl"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-4"
        >
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="group relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-mono uppercase tracking-widest text-white border border-white/15 bg-white/[0.04] hover:bg-white/[0.10] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.73-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.45.11-3.03 0 0 .97-.31 3.17 1.18.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.74.11 3.03.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.26 5.68.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.67.8.56 4.57-1.52 7.85-5.83 7.85-10.91C23.5 5.65 18.35.5 12 .5z" />
            </svg>
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-mono uppercase tracking-widest text-white border border-white/15 bg-white/[0.04] hover:bg-white/[0.10] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
            </svg>
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="group relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-mono uppercase tracking-widest text-black bg-gradient-to-r from-zinc-100 to-zinc-300 hover:from-white hover:to-zinc-100 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <path d="m22 6-10 7L2 6" />
            </svg>
            Email
          </a>
        </motion.div>
      </motion.div>

      <Chevron />
    </section>
  )
}
