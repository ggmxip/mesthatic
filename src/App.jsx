import { useState, useEffect, useRef } from 'react'
import BackgroundScene from './components/canvas/BackgroundScene'
import { motion } from 'framer-motion'
import { sendContactEmail } from './services/email'

const Section = ({ id, children, className = "" }) => (
  <section 
    id={id}
    data-section={id}
    className={`min-h-screen w-full flex flex-col justify-center px-8 md:px-24 ${className}`}
  >
    {children}
  </section>
)

const MetalCard = ({ children, className = "", glowColor = "purple" }) => {
  const glowMap = {
    purple: 'group-hover:shadow-[0_0_50px_rgba(170,59,255,0.5)]',
    cyan: 'group-hover:shadow-[0_0_50px_rgba(0,255,255,0.5)]',
    none: ''
  }
  
  return (
    <motion.div 
      className={`relative pointer-events-auto ${glowMap[glowColor]} transition-all duration-500 group`}
      whileHover={{ scale: 1.01 }}
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-zinc-600/70 via-zinc-800/50 to-zinc-950/90" />
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-purple-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      <div className="absolute inset-[1px] rounded-[22px] border-t border-l border-white/25 border-b border-black/40 border-r border-black/30" />
      <div className="absolute inset-[1px] rounded-[22px] shadow-[inset_0_1px_2px_rgba(255,255,255,0.15),inset_0_-2px_4px_rgba(0,0,0,0.4)]" />
      <div className="relative z-10 p-12 rounded-3xl flex items-center justify-center">
        {children}
      </div>
    </motion.div>
  )
}

const MetallicScrollbar = ({ sections }) => {
  const [activeSection, setActiveSection] = useState('about')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [hoveredSection, setHoveredSection] = useState(null)
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(Math.min(scrollTop / docHeight, 1))
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: [0.3, 0.5, 0.7] }
    )

    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [sections])

  const sectionPositions = sections.map((_, i) => (i + 0.5) / sections.length)

  const handleClick = (section) => {
    const target = document.getElementById(section)
    if (target) {
      const targetTop = target.offsetTop
      const startTop = window.scrollY
      const distance = targetTop - startTop
      const duration = 400
      let startTime = null

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeProgress = 1 - Math.pow(1 - progress, 3)
        
        window.scrollTo(0, startTop + distance * easeProgress)
        
        if (progress < 1) requestAnimationFrame(animate)
      }
      
      requestAnimationFrame(animate)
    }
  }

  const getDiamondScale = (pos) => {
    const distance = Math.abs(scrollProgress - pos)
    if (distance < 0.08) return 1.3 - distance * 5
    return 1
  }

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center">
      <div className="relative h-80 w-0.5">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-white/10 rounded-full" />
        
        {sectionPositions.map((pos, i) => {
          const isActive = activeSection === sections[i]
          const isHovered = hoveredSection === sections[i]
          const isPast = scrollProgress >= pos
          const scale = getDiamondScale(pos)
          
          return (
            <div
              key={sections[i]}
              className="absolute cursor-pointer group"
              style={{ top: `${pos * 100}%`, left: '50%', transform: 'translate(-50%, -50%)' }}
              onClick={() => handleClick(sections[i])}
              onMouseEnter={() => setHoveredSection(sections[i])}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <div 
                className={`w-0 h-0 border-l-[8px] border-r-[8px] border-b-[14px] border-l-transparent border-r-transparent transition-all duration-300 ${
                  isActive || isHovered
                    ? 'border-white drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]' 
                    : isPast
                      ? 'border-white/60 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'
                      : 'border-white/30 group-hover:border-white/50'
                }`}
                style={{ 
                  transform: `scale(${scale})`,
                  transition: 'transform 0.2s ease-out, border-color 0.3s, filter 0.3s'
                }}
              />
            </div>
          )
        })}
        
        <div 
          className="absolute w-px bg-gradient-to-t from-transparent via-white/80 to-white"
          style={{ 
            bottom: 0,
            height: `${scrollProgress * 100}%`,
            boxShadow: '0 0 15px rgba(255,255,255,0.4)'
          }}
        />
        
        <div 
          className="absolute w-0 h-0 border-l-[10px] border-r-[10px] border-b-[18px] border-l-transparent border-r-transparent border-white drop-shadow-[0_0_20px_rgba(255,255,255,0.9)]"
          style={{ 
            top: `${scrollProgress * 100}%`,
            left: '50%',
            transform: 'translate(-50%, -50%)',
            transition: 'top 0.15s ease-out'
          }}
        />
      </div>
    </div>
  )
}

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    
    try {
      await sendContactEmail(formData)
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Email send failed:', error)
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Your Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        className="w-full p-3 rounded-xl bg-zinc-800/50 border border-zinc-600/50 text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none transition-colors"
      />
      <input
        type="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        className="w-full p-3 rounded-xl bg-zinc-800/50 border border-zinc-600/50 text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none transition-colors"
      />
      <textarea
        placeholder="Your Message"
        rows={4}
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        required
        className="w-full p-3 rounded-xl bg-zinc-800/50 border border-zinc-600/50 text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none transition-colors resize-none"
      />
      <button
        type="submit"
        disabled={status === 'sending' || status === 'success'}
        className="w-full py-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Sending...' : status === 'success' ? 'Sent!' : 'Send Message'}
      </button>
      {status === 'error' && <p className="text-red-400 text-sm text-center">Failed to send. Try again.</p>}
    </form>
  )
}

const caseStudies = [
  {
    id: 1,
    title: 'Workflow Automation Platform',
    description: 'Built a custom n8n integration that reduced manual data entry by 90% for a mid-size logistics company.',
    tags: ['n8n', 'Automation', 'API Integration'],
    color: 'purple'
  },
  {
    id: 2,
    title: 'Enterprise HR Portal',
    description: 'Designed and implemented a self-service portal for UKG Kronos, improving employee scheduling efficiency by 40%.',
    tags: ['UKG Kronos', 'HR Systems', 'React'],
    color: 'cyan'
  }
]

function App() {
  const sections = ['about', 'projects', 'casestudies', 'contact']

  return (
    <div className="relative w-full min-h-screen bg-black">
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <BackgroundScene />
      </div>
      <MetallicScrollbar sections={sections} />
      <div className="relative z-10 w-full flex flex-col pointer-events-none">
        
        <Section id="hero" className="items-center justify-center min-h-screen pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex items-center justify-center w-full group cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <h1 className="text-[10vw] md:text-[12rem] font-black tracking-tighter cursor-default select-none
              bg-gradient-to-b from-white via-zinc-200 to-zinc-600
              bg-[length:100%_200%] bg-[position:0%_0%]
              text-transparent bg-clip-text
              transition-all duration-500
              group-hover:bg-[position:0%_100%]">
              esc.
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-12 text-zinc-600 text-sm tracking-widest font-mono"
          >
            SCROLL ↓
          </motion.div>
        </Section>

        <Section id="about" className="items-start">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl font-bold mb-6 tracking-widest uppercase text-zinc-400">
                About
              </h2>
              <p className="text-3xl md:text-4xl font-light leading-snug bg-gradient-to-r from-zinc-200 via-white to-zinc-400 bg-clip-text text-transparent">
                Business Systems Analyst turned <span className="text-white font-medium">Software Developer</span>. 
                I don't just analyze the system—<span className="text-white font-medium">I build it.</span>
              </p>
              <div className="mt-8 h-px w-32 bg-gradient-to-r from-purple-500 to-cyan-500" />
              <p className="text-zinc-400 leading-relaxed mt-8 max-w-lg">
                Engineering automated workflows. Building high-fidelity web experiences. 
                Deep analytical skills now channeled into interactive web development.
              </p>
            </motion.div>
          </div>
        </Section>

        <Section id="projects" className="items-end text-right pb-32">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl font-bold mb-6 tracking-widest uppercase text-zinc-500">
                Work
              </h2>
              <div className="flex flex-col gap-6">
                <div className="group relative p-6 border-l border-zinc-700 hover:border-purple-500/80 transition-all cursor-pointer pl-6">
                  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <h3 className="text-2xl font-medium text-white group-hover:text-purple-400 transition-colors">AI Agent Workflows</h3>
                  <p className="text-zinc-500 text-sm mt-2">Automated business gap analysis using custom AI agents.</p>
                </div>
                <div className="group relative p-6 border-l border-zinc-700 hover:border-cyan-500/80 transition-all cursor-pointer pl-6">
                  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-cyan-800 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <h3 className="text-2xl font-medium text-white group-hover:text-cyan-400 transition-colors">UKG Kronos Configurations</h3>
                  <p className="text-zinc-500 text-sm mt-2">Enterprise HR system integrations and site requirements.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </Section>

        <Section id="casestudies" className="items-start">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl font-bold mb-8 tracking-widest uppercase text-zinc-500">
                Case Studies
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {caseStudies.map((study) => (
                  <div 
                    key={study.id}
                    className="group relative p-8 border border-zinc-800 hover:border-zinc-600 transition-all cursor-pointer bg-zinc-900/30"
                  >
                    <h3 className="text-xl font-medium text-white group-hover:text-purple-400 transition-colors mb-3">
                      {study.title}
                    </h3>
                    <p className="text-zinc-400 text-sm mb-4 leading-relaxed">{study.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {study.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 text-xs rounded-full bg-zinc-800/50 text-zinc-500 border border-zinc-700/50">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </Section>

        <Section id="contact" className="items-center pb-20">
          <div className="max-w-md w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold mb-2 tracking-widest uppercase text-zinc-400">
                Contact
              </h2>
              <p className="text-zinc-500 mb-10">
                Let's build something extraordinary.
              </p>
              <ContactForm />
            </motion.div>
          </div>
        </Section>

      </div>
    </div>
  )
}

export default App