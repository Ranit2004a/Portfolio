import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [scrollUp, setScrollUp] = useState(false)
  const [isResumeOpen, setIsResumeOpen] = useState(false)

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
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  )
}

export default App
