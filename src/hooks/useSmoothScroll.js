import { useEffect } from 'react'

export function useSmoothScroll() {
  useEffect(() => {
    let lenis = null
    let rafId = null

    const init = async () => {
      const module = await import('lenis')
      const Lenis = module.default || module.Lenis || module
      
      lenis = new Lenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      })

      const animate = (time) => {
        lenis.raf(time)
        rafId = requestAnimationFrame(animate)
      }

      rafId = requestAnimationFrame(animate)
    }

    init()

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      if (lenis) lenis.destroy()
    }
  }, [])
}