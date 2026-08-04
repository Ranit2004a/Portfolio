import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Terminal as TerminalIcon } from 'lucide-react'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import GithubStats from './components/GithubStats'
import LeetCodeStats from './components/LeetCodeStats'
import Publications from './components/Publications'
import Certifications from './components/Certifications'
import SocialMedia from './components/SocialMedia'
import Contact from './components/Contact'
import Navbar from './components/Navbar'
import ResumeModal from './components/ResumeModal'
import TerminalModal from './components/TerminalModal'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [scrollUp, setScrollUp] = useState(false)
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const isDarkMode = document.documentElement.classList.contains('dark')
      if (isDarkMode && currentScrollY > 50) {
        if (currentScrollY < lastScrollY) {
          setScrollUp(true)
        } else {
          setScrollUp(false)
        }
      } else {
        setScrollUp(false)
      }
      lastScrollY = currentScrollY
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll)

    // Keyboard shortcut to toggle terminal (Backtick key `)
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault()
        setIsTerminalOpen((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleGlobalKeyDown)

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', handleGlobalKeyDown)
    }
  }, [])

  return (
    <div className={`relative min-h-screen text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground transition-colors duration-1000 ease-in-out ${scrollUp ? 'bg-[#111844]' : 'bg-background'}`}>
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />
      <main>
        <Hero onOpenResume={() => setIsResumeOpen(true)} />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <GithubStats />
        <LeetCodeStats />
        <Publications />
        <Certifications />
        <SocialMedia />
        <Contact />
      </main>

      {/* Floating Terminal Trigger Button */}
      <button
        onClick={() => setIsTerminalOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-slate-950/90 text-emerald-400 border border-emerald-500/40 shadow-[0_0_25px_rgba(16,185,129,0.25)] hover:scale-110 hover:border-emerald-400 active:scale-95 transition-all group flex items-center justify-center backdrop-blur-md"
        title="Open Developer Terminal CLI (Press `)"
      >
        <TerminalIcon className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform" />
      </button>

      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onOpenResume={() => setIsResumeOpen(true)}
      />
    </div>
  )
}

export default App
