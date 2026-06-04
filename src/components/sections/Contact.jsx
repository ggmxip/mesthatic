import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../../data/resume'
import MeshGradient from '../ui/MeshGradient'
import BrushedMetal from '../ui/BrushedMetal'
import MetalCard from '../ui/MetalCard'

const TILES = [
  {
    id: 'email',
    label: 'Email',
    href: `mailto:${profile.email}?subject=Hello%20Aditya`,
    sub: profile.email,
    glow: 'purple',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <path d="m22 6-10 7L2 6" />
      </svg>
    ),
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: profile.linkedin,
    sub: 'linkedin.com/in/adityaishxn',
    glow: 'cyan',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
      </svg>
    ),
  },
  {
    id: 'github',
    label: 'GitHub',
    href: profile.github,
    sub: `@${profile.handle}`,
    glow: 'pink',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.73-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.45.11-3.03 0 0 .97-.31 3.17 1.18.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.74.11 3.03.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.26 5.68.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.67.8.56 4.57-1.52 7.85-5.83 7.85-10.91C23.5 5.65 18.35.5 12 .5z" />
      </svg>
    ),
  },
]

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false)
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard blocked */
    }
  }
  return (
    <button
      onClick={onCopy}
      className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={copied ? 'y' : 'n'}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.18 }}
          className="inline-block"
        >
          {copied ? 'Copied' : 'Copy'}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen w-full flex flex-col justify-center px-6 md:px-24 py-24 relative"
    >
      <MeshGradient className="opacity-50" />
      <BrushedMetal className="opacity-15" />

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-mono uppercase tracking-[0.4em] text-zinc-500 mb-3">
            [ 08 ] · Get in touch
          </p>
          <h2 className="text-4xl md:text-6xl font-light bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            Let's build something
            <br />
            <span className="metal-text font-black">extraordinary.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {TILES.map((tile, i) => (
            <MetalCard
              key={tile.id}
              glow={tile.glow}
              delay={i * 0.1}
              hover
              className="!p-0"
            >
              <a
                href={tile.href}
                target={tile.id === 'email' ? undefined : '_blank'}
                rel="noreferrer"
                className="block"
              >
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="h-12 w-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-white/15 to-white/5 border border-white/15"
                    style={{
                      boxShadow:
                        'inset 0 1px 0 rgba(255,255,255,0.25), 0 6px 18px rgba(0,0,0,0.4)',
                    }}
                  >
                    {tile.icon}
                  </div>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-zinc-500 group-hover:text-white transition-colors"
                  >
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </div>
                <h3 className="text-2xl font-medium text-white">{tile.label}</h3>
                <p className="text-zinc-500 text-sm font-mono mt-1 truncate">
                  {tile.sub}
                </p>
              </a>
              {tile.id === 'email' && (
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
                    Click to open mail client
                  </span>
                  <CopyButton value={profile.email} />
                </div>
              )}
            </MetalCard>
          ))}
        </div>

        <footer className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-mono uppercase tracking-widest text-zinc-600">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>Built with React · Three.js · Framer Motion</span>
          <span>Last updated · Jun 2026</span>
        </footer>
      </div>
    </section>
  )
}
