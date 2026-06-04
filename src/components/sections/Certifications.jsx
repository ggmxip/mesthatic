import { motion } from 'framer-motion'
import { certifications } from '../../data/resume'
import BrushedMetal from '../ui/BrushedMetal'
import MetalCard from '../ui/MetalCard'

const GLOWS = ['cyan', 'purple', 'pink', 'cyan']

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="min-h-screen w-full flex flex-col justify-center px-6 md:px-24 py-24 relative"
    >
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
            [ 07 ] · Recognition
          </p>
          <h2 className="text-4xl md:text-5xl font-light bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            Certifications & Awards
          </h2>
        </motion.div>

        <ul className="space-y-4">
          {certifications.map((c, i) => (
            <motion.li
              key={c.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <MetalCard
                glow={GLOWS[i % GLOWS.length]}
                delay={0}
                className="!p-0"
                hover
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 mt-1">
                    <div
                      className="h-10 w-10 rounded-lg bg-gradient-to-br from-white/15 to-white/5 border border-white/15 flex items-center justify-center"
                      style={{
                        boxShadow:
                          'inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.4)',
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-medium text-white">
                      {c.title}
                    </h3>
                    <p className="text-zinc-400 text-sm mt-1 leading-relaxed">
                      {c.org}
                    </p>
                  </div>
                </div>
              </MetalCard>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
