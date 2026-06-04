import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navSections } from '../../data/resume'

export default function TopNav() {
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(navSections[0].id)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { threshold: [0.3, 0.5, 0.7] },
    )
    navSections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleClick = (id) => {
    setOpen(false)
    const target = document.getElementById(id)
    if (!target) return
    const start = window.scrollY
    const dist = target.offsetTop - start
    const dur = 650
    let t0 = null
    const step = (now) => {
      if (!t0) t0 = now
      const p = Math.min((now - t0) / dur, 1)
      const e = 1 - Math.pow(1 - p, 3)
      window.scrollTo(0, start + dist * e)
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 pointer-events-none"
        >
          <div className="mx-auto max-w-6xl flex items-center justify-between rounded-full border border-white/10 border-t-white/20 bg-black/40 backdrop-blur-md px-5 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] pointer-events-auto">
            <button
              onClick={() => handleClick('hero')}
              className="font-mono text-xs tracking-[0.35em] uppercase text-zinc-300 hover:text-white transition-colors"
            >
              ggmxip
            </button>
            <ul className="hidden md:flex items-center gap-1">
              {navSections.map(({ id, label }) => (
                <li key={id}>
                  <button
                    onClick={() => handleClick(id)}
                    className={`relative px-3 py-1.5 text-xs font-mono tracking-wider uppercase transition-colors ${
                      active === id ? 'text-white' : 'text-zinc-500 hover:text-zinc-200'
                    }`}
                  >
                    {label}
                    {active === id && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute -bottom-0.5 left-3 right-3 h-px bg-gradient-to-r from-transparent via-white to-transparent"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden text-zinc-300 text-xs font-mono uppercase tracking-widest"
              aria-label="Toggle menu"
            >
              {open ? '[ × ]' : '[ ≡ ]'}
            </button>
          </div>
          <AnimatePresence>
            {open && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-black/70 backdrop-blur-md"
              >
                {navSections.map(({ id, label }) => (
                  <li key={id}>
                    <button
                      onClick={() => handleClick(id)}
                      className="w-full text-left px-5 py-2.5 text-xs font-mono tracking-wider uppercase text-zinc-300 hover:text-white hover:bg-white/5"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
