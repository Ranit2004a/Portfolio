import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Menu, X, FileText } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { cn } from '../lib/utils'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'GitHub', href: '#github' },
  { name: 'Publications', href: '#publications' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Socials', href: '#socials' },
  { name: 'Contact', href: '#contact' },
]

interface NavbarProps {
  onOpenResume?: () => void
}

export default function Navbar({ onOpenResume }: NavbarProps) {
  const { theme, setTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    setIsMobileMenuOpen(false)
    setTimeout(() => {
      const element = document.querySelector(href)
      if (element) {
        const headerOffset = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.scrollY - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 150)
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border py-4'
          : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold tracking-tighter"
        >
          Developer<span className="text-primary">.</span>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <motion.button
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => scrollTo(link.href)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </motion.button>
          ))}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            onClick={onOpenResume}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all"
            title="View Resume / CV"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </motion.button>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full bg-secondary/50 hover:bg-secondary text-secondary-foreground transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={onOpenResume}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CV</span>
          </button>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full bg-secondary/50 hover:bg-secondary text-secondary-foreground transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <nav className="flex flex-col px-4 py-4 gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.href)}
                  className="text-left text-lg font-medium text-muted-foreground hover:text-foreground py-2"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  onOpenResume?.()
                }}
                className="text-left text-lg font-bold text-primary py-2 flex items-center gap-2"
              >
                <FileText className="w-5 h-5" /> View Resume (PDF)
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
