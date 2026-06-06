import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import './index.css'
import App from './App.jsx'

const lenis = new Lenis({
  duration: 1,
  easing: (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1,
  lerp: 0.1,
  smoothTouch: true,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

window.addEventListener('load', () => {
  setTimeout(() => lenis.resize(), 100)
})

createRoot(document.getElementById('root')).render(<App />)
