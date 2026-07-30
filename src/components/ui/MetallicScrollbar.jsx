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
      <div className="relative h-96 w-8">
        <div className="absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-white/15 via-white/5 to-white/15 shadow-[inset_0_0_8px_rgba(255,255,255,0.12)]" />
        <div
          className="absolute left-1/2 bottom-0 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-t from-cyan-300 via-white to-purple-300"
          style={{
            height: `${scrollProgress * 100}%`,
            boxShadow:
              '0 0 18px rgba(0,255,255,0.38), 0 0 26px rgba(170,59,255,0.2)',
            transition: 'height 0.12s ease-out',
          }}
        />
        <div
          className="absolute h-5 w-5 rounded-[4px] border border-white/80 bg-gradient-to-br from-white via-zinc-300 to-zinc-800"
          style={{
            top: `${scrollProgress * 100}%`,
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(45deg)',
            boxShadow:
              'inset 0 1px 0 rgba(255,255,255,0.8), 0 0 18px rgba(255,255,255,0.72)',
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
            <button
              key={id}
              type="button"
              aria-label={`Scroll to ${id}`}
              className="absolute group flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center"
              style={{
                top: `${pos * 100}%`,
                left: '50%',
              }}
              onClick={() => handleClick(id)}
              onMouseEnter={() => setHoveredSection(id)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <div
                className={`h-3 w-3 rounded-[3px] border transition-all duration-300 ${
                  isActive || isHovered
                    ? 'border-white bg-white'
                    : isPast
                      ? 'border-white/70 bg-white/45'
                      : 'border-white/30 bg-black/60 group-hover:border-white/60 group-hover:bg-white/25'
                }`}
                style={{
                  transform: `rotate(45deg) scale(${scale})`,
                  boxShadow:
                    isActive || isHovered
                      ? '0 0 16px rgba(255,255,255,0.9), 0 0 22px rgba(0,255,255,0.24)'
                      : isPast
                        ? '0 0 10px rgba(255,255,255,0.34)'
                        : 'none',
                  transition: 'transform 0.2s ease-out, box-shadow 0.3s',
                }}
              />
              <span
                className={`absolute right-9 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-black/65 px-2 py-1 text-[10px] tracking-[0.25em] uppercase font-mono backdrop-blur transition-all duration-300 ${
                  isActive || isHovered
                    ? 'text-white opacity-100 translate-x-0'
                    : 'text-zinc-500 opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
                }`}
              >
                {id}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
