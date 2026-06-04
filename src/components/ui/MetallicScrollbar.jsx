import { useEffect, useState } from 'react'

export default function MetallicScrollbar({ sections }) {
  const [activeSection, setActiveSection] = useState(sections[0])
  const [scrollProgress, setScrollProgress] = useState(0)
  const [hoveredSection, setHoveredSection] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveSection(visible[0].target.id)
      },
      { threshold: [0.2, 0.4, 0.6, 0.8] },
    )

    sections.forEach((id) => {
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

  const handleClick = (id) => {
    const target = document.getElementById(id)
    if (!target) return
    const startTop = window.scrollY
    const distance = target.offsetTop - startTop
    const duration = 700
    let startTime = null
    const animate = (now) => {
      if (!startTime) startTime = now
      const progress = Math.min((now - startTime) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      window.scrollTo(0, startTop + distance * ease)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }

  const getDiamondScale = (pos) => {
    const distance = Math.abs(scrollProgress - pos)
    if (distance < 0.08) return 1.4 - distance * 6
    return 1
  }

  return (
    <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center pointer-events-auto">
      <div className="relative h-96 w-px">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-white/10 rounded-full" />
        <div
          className="absolute w-px bg-gradient-to-t from-transparent via-white/80 to-white"
          style={{
            bottom: 0,
            height: `${scrollProgress * 100}%`,
            boxShadow: '0 0 15px rgba(255,255,255,0.45)',
            transition: 'height 0.12s ease-out',
          }}
        />
        <div
          className="absolute w-0 h-0 border-l-[10px] border-r-[10px] border-b-[18px] border-l-transparent border-r-transparent border-white"
          style={{
            top: `${scrollProgress * 100}%`,
            left: '50%',
            transform: 'translate(-50%, -50%)',
            filter: 'drop-shadow(0 0 18px rgba(255,255,255,0.9))',
            transition: 'top 0.12s ease-out',
          }}
        />
        {sectionPositions.map((pos, i) => {
          const id = sections[i]
          const isActive = activeSection === id
          const isHovered = hoveredSection === id
          const isPast = scrollProgress >= pos
          const scale = getDiamondScale(pos)
          return (
            <div
              key={id}
              className="absolute cursor-pointer group"
              style={{
                top: `${pos * 100}%`,
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              onClick={() => handleClick(id)}
              onMouseEnter={() => setHoveredSection(id)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <div
                className={`w-0 h-0 border-l-[7px] border-r-[7px] border-b-[12px] border-l-transparent border-r-transparent transition-all duration-300 ${
                  isActive || isHovered
                    ? 'border-white'
                    : isPast
                      ? 'border-white/60'
                      : 'border-white/30 group-hover:border-white/55'
                }`}
                style={{
                  transform: `scale(${scale})`,
                  filter:
                    isActive || isHovered
                      ? 'drop-shadow(0 0 14px rgba(255,255,255,0.95))'
                      : isPast
                        ? 'drop-shadow(0 0 8px rgba(255,255,255,0.35))'
                        : 'none',
                  transition: 'transform 0.2s ease-out, filter 0.3s',
                }}
              />
              <span
                className={`absolute left-3 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] tracking-[0.25em] uppercase font-mono transition-all duration-300 ${
                  isActive || isHovered
                    ? 'text-white opacity-100 translate-x-0'
                    : 'text-zinc-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
                }`}
              >
                {id}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
