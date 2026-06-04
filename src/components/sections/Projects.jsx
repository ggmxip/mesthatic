import { motion } from 'framer-motion'
import { projects, profile } from '../../data/resume'
import MeshGradient from '../ui/MeshGradient'
import BrushedMetal from '../ui/BrushedMetal'
import MetalCard from '../ui/MetalCard'

function ArrowOut() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  )
}

function Lock() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

export default function Projects() {
  const [first, ...rest] = projects

  return (
    <section
      id="projects"
      className="min-h-screen w-full flex flex-col justify-center px-6 md:px-24 py-24 relative"
    >
      <MeshGradient className="opacity-40" />
      <BrushedMetal className="opacity-15" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12 flex-wrap gap-4"
        >
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.4em] text-zinc-500 mb-3">
              [ 03 ] · Selected Work
            </p>
            <h2 className="text-4xl md:text-5xl font-light bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
              Projects
            </h2>
          </div>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-2"
          >
            View all on GitHub <ArrowOut />
          </a>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          <MetalCard
            className="md:col-span-2 !p-0"
            glow="purple"
            delay={0}
            hover
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-purple-300/80">
                  Featured · {first.year}
                </span>
                <h3 className="text-3xl md:text-4xl font-medium text-white mt-2">
                  {first.name}
                </h3>
              </div>
              {first.repo ? (
                <a
                  href={first.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 self-start rounded-full px-4 py-2 text-xs font-mono uppercase tracking-widest border border-white/15 text-white hover:bg-white/10 transition-colors"
                >
                  Repo <ArrowOut />
                </a>
              ) : null}
            </div>
            <p className="text-zinc-300 text-base leading-relaxed max-w-3xl">
              {first.blurb}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {first.stack.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider rounded-full bg-white/[0.05] border border-white/10 text-zinc-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </MetalCard>

          {rest.map((p, i) => (
            <MetalCard
              key={p.id}
              glow={i % 2 === 0 ? 'cyan' : 'pink'}
              delay={0.05 * (i + 1)}
              className="!p-0"
              hover
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-xl md:text-2xl font-medium text-white">
                  {p.name}
                </h3>
                {p.repo ? (
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors"
                    aria-label={`Open ${p.name} on GitHub`}
                  >
                    <ArrowOut />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                    <Lock /> Private
                  </span>
                )}
              </div>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">
                {p.year}
              </span>
              <p className="text-zinc-300 text-sm leading-relaxed mt-3">
                {p.blurb}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-full bg-white/[0.04] border border-white/10 text-zinc-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </MetalCard>
          ))}
        </div>
      </div>
    </section>
  )
}
