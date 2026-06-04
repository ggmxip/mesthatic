import BackgroundScene from './components/canvas/BackgroundScene'
import TopNav from './components/ui/TopNav'
import MetallicScrollbar from './components/ui/MetallicScrollbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Experience from './components/sections/Experience'
import Projects from './components/sections/Projects'
import GitHubSection from './components/sections/GitHubSection'
import Skills from './components/sections/Skills'
import Education from './components/sections/Education'
import Certifications from './components/sections/Certifications'
import Contact from './components/sections/Contact'
import { sectionIds } from './data/resume'

function App() {
  return (
    <div className="relative w-full min-h-screen bg-black">
      <div
        style={{ position: 'fixed', inset: 0, zIndex: 0 }}
        aria-hidden="true"
      >
        <BackgroundScene />
      </div>

      <TopNav />
      <MetallicScrollbar sections={sectionIds} />

      <main className="relative z-10 w-full flex flex-col">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <GitHubSection />
        <Skills />
        <Education />
        <Certifications />
        <Contact />
      </main>
    </div>
  )
}

export default App
