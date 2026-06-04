import { motion } from 'framer-motion'
import { stats, profile } from '../../data/resume'
import MeshGradient from '../ui/MeshGradient'
import BrushedMetal from '../ui/BrushedMetal'
import MetalCard from '../ui/MetalCard'

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen w-full flex flex-col justify-center px-6 md:px-24 relative"
    >
      <MeshGradient className="opacity-60" />
      <BrushedMetal className="opacity-20" />

      <div className="relative z-10 max-w-5xl grid md:grid-cols-[1.4fr_1fr] gap-12 md:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-mono uppercase tracking-[0.4em] text-zinc-500 mb-6">
            [ 01 ] · About
          </p>
          <h2 className="text-3xl md:text-5xl font-light leading-tight bg-gradient-to-r from-zinc-100 via-white to-zinc-400 bg-clip-text text-transparent">
            Business Systems Analyst turned{' '}
            <span className="text-white font-medium">Software Developer</span>.
            I don't just analyze the system —{' '}
            <span className="text-white font-medium">I build it.</span>
          </h2>

          <div className="mt-8 h-px w-32 bg-gradient-to-r from-purple-500 via-cyan-400 to-transparent" />

          <p className="text-zinc-400 leading-relaxed mt-8 text-base md:text-lg max-w-xl">
            {profile.tagline} From UKG Kronos payroll pipelines to React
            interfaces to Chrome extensions — engineering automated workflows,
            shipping high-fidelity web experiences, and turning deep analytical
            instincts into products that actually move.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4">
          {stats.map((s, i) => (
            <MetalCard
              key={s.label}
              glow={i % 2 === 0 ? 'purple' : 'cyan'}
              delay={i * 0.1}
              className="!p-0"
            >
              <div className="flex items-baseline justify-between gap-4 py-2">
                <span className="text-5xl md:text-6xl font-black metal-text">
                  {s.value}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 text-right max-w-[8rem]">
                  {s.label}
                </span>
              </div>
            </MetalCard>
          ))}
        </div>
      </div>
    </section>
  )
}
