import { motion } from 'framer-motion'
import { skills } from '../../data/resume'
import BrushedMetal from '../ui/BrushedMetal'
import MetalCard from '../ui/MetalCard'

const GLOWS = ['purple', 'cyan', 'pink']

export default function Skills() {
  return (
    <section
      id="skills"
      className="min-h-screen w-full flex flex-col justify-center px-6 md:px-24 py-24 relative"
    >
      <BrushedMetal className="opacity-15" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-xs font-mono uppercase tracking-[0.4em] text-zinc-500 mb-3">
            [ 05 ] · Stack
          </p>
          <h2 className="text-4xl md:text-5xl font-light bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            Skills
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {skills.map((cat, i) => (
            <MetalCard
              key={cat.group}
              glow={GLOWS[i % GLOWS.length]}
              delay={i * 0.1}
              className="!p-0"
              hover
            >
              <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400 mb-5">
                {cat.group}
              </h3>
              <div className="h-px w-full bg-gradient-to-r from-white/20 to-transparent mb-5" />
              <ul className="flex flex-wrap gap-2">
                {cat.items.map((skill) => (
                  <li
                    key={skill}
                    className="px-2.5 py-1 text-xs font-mono rounded-md bg-white/[0.04] border border-white/10 text-zinc-300 hover:border-white/30 hover:text-white hover:bg-white/[0.07] transition-all cursor-default"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
              <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 mt-5">
                {cat.items.length} item{cat.items.length === 1 ? '' : 's'}
              </p>
            </MetalCard>
          ))}
        </div>
      </div>
    </section>
  )
}
