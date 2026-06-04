import { motion } from 'framer-motion'
import { education } from '../../data/resume'
import MeshGradient from '../ui/MeshGradient'
import BrushedMetal from '../ui/BrushedMetal'
import MetalCard from '../ui/MetalCard'

export default function Education() {
  return (
    <section
      id="education"
      className="min-h-screen w-full flex flex-col justify-center px-6 md:px-24 py-24 relative"
    >
      <MeshGradient className="opacity-30" />
      <BrushedMetal className="opacity-15" />

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-xs font-mono uppercase tracking-[0.4em] text-zinc-500 mb-3">
            [ 06 ] · Education
          </p>
          <h2 className="font-mono text-4xl md:text-5xl font-light tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            self/thought
          </h2>
        </motion.div>

        <div className="space-y-6">
          {education.map((ed, i) => (
            <MetalCard
              key={ed.id}
              glow={i === 0 ? 'pink' : i === 1 ? 'purple' : 'cyan'}
              delay={i * 0.1}
              className="!p-0"
              hover
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                <div className="min-w-0">
                  {ed.id === 'internet' && (
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.25em] text-pink-300/90 border border-pink-300/20 bg-pink-300/[0.04] rounded-full px-2.5 py-0.5 mb-2">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75 animate-ping" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-pink-400" />
                      </span>
                      Self-Taught · Ongoing
                    </span>
                  )}
                  <h3 className="text-xl md:text-2xl font-medium text-white">
                    {ed.school}
                  </h3>
                  <p className="text-zinc-300 text-sm md:text-base mt-1">
                    {ed.degree}
                  </p>
                </div>
                <div className="text-left md:text-right">
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 block">
                    {ed.period}
                  </span>
                  <span className="text-sm font-mono text-cyan-300/90 mt-1 inline-block">
                    {ed.meta}
                  </span>
                </div>
              </div>

              {ed.coursework.length > 0 && (
                <div className="pt-5 border-t border-white/5">
                  <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 mb-3">
                    Coursework
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {ed.coursework.map((c) => (
                      <span
                        key={c}
                        className="px-2.5 py-1 text-[11px] rounded-md bg-white/[0.04] border border-white/10 text-zinc-300"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </MetalCard>
          ))}
        </div>
      </div>
    </section>
  )
}
