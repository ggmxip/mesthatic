import { motion } from 'framer-motion'
import { experience } from '../../data/resume'
import BrushedMetal from '../ui/BrushedMetal'
import MetalCard from '../ui/MetalCard'

export default function Experience() {
  return (
    <section
      id="experience"
      className="min-h-screen w-full flex flex-col justify-center px-6 md:px-24 py-24 relative"
    >
      <BrushedMetal className="opacity-15" />

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-xs font-mono uppercase tracking-[0.4em] text-zinc-500 mb-12"
        >
          [ 02 ] · Experience
        </motion.p>

        <div className="relative">
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-white/30 via-white/10 to-transparent" />

          <div className="space-y-12">
            {experience.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="relative pl-14 md:pl-20"
              >
                <div className="absolute left-0 top-2 flex h-8 w-8 md:h-12 md:w-12 items-center justify-center rounded-full border border-white/20 bg-black/60 backdrop-blur-sm">
                  <div
                    className={`h-2 w-2 md:h-3 md:w-3 rounded-full ${
                      i === 0
                        ? 'bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.7)]'
                        : 'bg-zinc-400'
                    }`}
                  />
                </div>

                <MetalCard hover className="!p-0" glow={i === 0 ? 'purple' : 'cyan'}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-6">
                    <div>
                      <h3 className="text-xl md:text-2xl font-medium text-white">
                        {job.title}
                      </h3>
                      <p className="text-zinc-400 text-sm mt-1">
                        {job.company}{' '}
                        <span className="text-zinc-600">·</span> {job.location}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 md:text-right">
                      {job.period}
                    </span>
                  </div>

                  <ul className="space-y-3 text-zinc-300 text-sm md:text-[15px] leading-relaxed">
                    {job.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="text-zinc-600 mt-2 inline-block h-px w-3 bg-zinc-600 flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2 pt-5 border-t border-white/5">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider rounded-full bg-white/[0.04] border border-white/10 text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </MetalCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
