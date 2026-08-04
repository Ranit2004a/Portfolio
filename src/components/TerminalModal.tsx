import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft, Sparkles } from 'lucide-react'

interface TerminalModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenResume?: () => void
}

interface CommandHistoryItem {
  id: string
  command: string
  output: React.ReactNode
}

export default function TerminalModal({ isOpen, onClose, onOpenResume }: TerminalModalProps) {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<CommandHistoryItem[]>([])
  const [historyIndex, setHistoryIndex] = useState<number>(-1)
  const [commandList, setCommandList] = useState<string[]>([])
  const [isMaximized, setIsMaximized] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const terminalEndRef = useRef<HTMLDivElement>(null)

  // Focus input on open & scroll to end
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return

    const lower = trimmed.toLowerCase()
    let output: React.ReactNode = null

    // Track command list for history navigation
    setCommandList((prev) => [...prev, trimmed])
    setHistoryIndex(-1)

    if (lower === 'clear' || lower === 'cls') {
      setHistory([])
      setInput('')
      return
    }

    switch (true) {
      case lower === 'help':
        output = (
          <div className="space-y-1 text-xs sm:text-sm font-mono text-zinc-300">
            <p className="text-primary font-bold mb-2">⚡ Available Portfolio Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
              <div><span className="text-emerald-400 font-bold">about</span> : Brief biography</div>
              <div><span className="text-emerald-400 font-bold">skills</span> : Technical proficiencies</div>
              <div><span className="text-emerald-400 font-bold">projects</span> : Selected works & repos</div>
              <div><span className="text-emerald-400 font-bold">github</span> : GitHub stats & link</div>
              <div><span className="text-emerald-400 font-bold">leetcode</span> : DSA problem solving stats</div>
              <div><span className="text-emerald-400 font-bold">cat cv.txt</span> : View CV / Open Resume</div>
              <div><span className="text-emerald-400 font-bold">experience</span> : ECL Internship summary</div>
              <div><span className="text-emerald-400 font-bold">publications</span> : Research paper info</div>
              <div><span className="text-emerald-400 font-bold">certifications</span> : Certified credentials</div>
              <div><span className="text-emerald-400 font-bold">contact</span> : Email & scroll to contact</div>
              <div><span className="text-emerald-400 font-bold">whoami</span> : Current visitor session</div>
              <div><span className="text-emerald-400 font-bold">date</span> : System timestamp</div>
              <div><span className="text-emerald-400 font-bold">clear</span> : Clear terminal output</div>
            </div>
          </div>
        )
        break

      case lower === 'about' || lower === 'bio':
        output = (
          <div className="text-xs sm:text-sm font-mono text-zinc-300 space-y-2">
            <p className="text-emerald-400 font-bold">Ranit Mondal — Full Stack & Backend Developer</p>
            <p>Pursuing B.Tech in Computer Science and Engineering (Data Science) at Dr. B.C. Roy Engineering College, Durgapur.</p>
            <p>Specializes in MERN Stack, Docker, Kubernetes, AWS ECS/Fargate, RESTful APIs, and Cloud Infrastructure.</p>
          </div>
        )
        break

      case lower === 'skills':
        output = (
          <div className="text-xs sm:text-sm font-mono text-zinc-300 space-y-2">
            <p className="text-cyan-400 font-bold">🛠️ Technical Stack:</p>
            <p><span className="text-emerald-400 font-semibold">• Languages:</span> Python, C++, Java, JavaScript, TypeScript</p>
            <p><span className="text-emerald-400 font-semibold">• Frontend:</span> React.js, Tailwind CSS, HTML5, Framer Motion, Vite</p>
            <p><span className="text-emerald-400 font-semibold">• Backend:</span> Node.js, Express.js, Flask, REST APIs, Microservices</p>
            <p><span className="text-emerald-400 font-semibold">• Cloud & DevOps:</span> AWS (EC2, ECS, ECR, Lambda, S3), Docker, Kubernetes, Terraform, GitHub Actions, Ansible</p>
            <p><span className="text-emerald-400 font-semibold">• Databases:</span> MongoDB, MySQL, SQLite</p>
          </div>
        )
        break

      case lower === 'projects':
        output = (
          <div className="text-xs sm:text-sm font-mono text-zinc-300 space-y-2">
            <p className="text-amber-400 font-bold">🚀 Featured Repositories:</p>
            <p>1. <span className="text-emerald-400 font-bold">FLASHCHAT</span> - Real-time chat app with Socket.IO, Redis, Docker & K3s</p>
            <p>2. <span className="text-emerald-400 font-bold">Real-Time Collaborative Coding</span> - Synchronized code editing with Yjs & AWS ECS</p>
            <p>3. <span className="text-emerald-400 font-bold">GenAI Resume Intelligence</span> - Google Gemini API resume matcher & prep platform</p>
            <p>4. <span className="text-emerald-400 font-bold">Notes App</span> - K8s HPA auto-scaling cloud-native app</p>
          </div>
        )
        break

      case lower === 'github':
        output = (
          <div className="text-xs sm:text-sm font-mono text-zinc-300 space-y-1">
            <p className="text-purple-400 font-bold">🐙 GitHub Profile Overview:</p>
            <p>User: <span className="text-emerald-400 font-bold">Ranit2004a</span></p>
            <p>Public Repositories: 15+</p>
            <p>Link: <a href="https://github.com/Ranit2004a" target="_blank" rel="noreferrer" className="text-cyan-400 underline">https://github.com/Ranit2004a</a></p>
          </div>
        )
        break

      case lower === 'leetcode':
        output = (
          <div className="text-xs sm:text-sm font-mono text-zinc-300 space-y-1">
            <p className="text-amber-400 font-bold">🧩 LeetCode DSA Profile:</p>
            <p>User: <span className="text-emerald-400 font-bold">ranit2002</span></p>
            <p>Total Solved: 150+ Questions (Easy: 75, Medium: 65, Hard: 10)</p>
            <p>Link: <a href="https://leetcode.com/u/ranit2002/" target="_blank" rel="noreferrer" className="text-cyan-400 underline">https://leetcode.com/u/ranit2002/</a></p>
          </div>
        )
        break

      case lower === 'cat cv.txt' || lower === 'cat resume.txt' || lower === 'cv' || lower === 'resume':
        onOpenResume?.()
        output = (
          <div className="text-xs sm:text-sm font-mono text-emerald-400 space-y-1">
            <p>📄 Opening Ranit Mondal's Curriculum Vitae (PDF Previewer)...</p>
            <p className="text-zinc-400">Direct PDF link: <a href="/cv.pdf" target="_blank" rel="noreferrer" className="text-cyan-400 underline">/cv.pdf</a></p>
          </div>
        )
        break

      case lower === 'experience':
        output = (
          <div className="text-xs sm:text-sm font-mono text-zinc-300 space-y-1">
            <p className="text-cyan-400 font-bold">💼 Eastern Coalfields Limited (ECL) Internship:</p>
            <p>Role: Software Engineer Intern (Jul 2025 – Aug 2025)</p>
            <p>• Built Flask RESTful APIs improving request efficiency by 30%</p>
            <p>• Developed leave management system for 100+ users</p>
            <p>• Automated GitHub Actions CI/CD reducing deployment time by 70%</p>
          </div>
        )
        break

      case lower === 'publications' || lower === 'research':
        output = (
          <div className="text-xs sm:text-sm font-mono text-zinc-300 space-y-1">
            <p className="text-indigo-400 font-bold">📚 Academic Publication (Paper ID: 203):</p>
            <p>Title: "Advancing Lung Cancer Diagnosis and Prognosis"</p>
            <p>Conference: Accepted at CICBA-2024 (Published in Springer proceedings)</p>
            <p>Link: <a href="https://link.springer.com/chapter/10.1007/978-3-031-81339-9_24" target="_blank" rel="noreferrer" className="text-cyan-400 underline">Springer Chapter</a></p>
          </div>
        )
        break

      case lower === 'certifications':
        output = (
          <div className="text-xs sm:text-sm font-mono text-zinc-300 space-y-1">
            <p className="text-emerald-400 font-bold">📜 Credentials & Certifications:</p>
            <p>1. NVIDIA GenAI Practice Certification (LLMs & Generative Workflows)</p>
            <p>2. IIT Bombay Spoken Tutorials (Python, Java, HTML5, RDBMS, Drupal)</p>
          </div>
        )
        break

      case lower === 'contact' || lower === 'email':
        output = (
          <div className="text-xs sm:text-sm font-mono text-zinc-300 space-y-1">
            <p className="text-primary font-bold">✉️ Contact Information:</p>
            <p>Email: <a href="mailto:ranitmondal197@gmail.com" className="text-cyan-400 underline">ranitmondal197@gmail.com</a></p>
            <p className="text-emerald-400">Scrolling to contact section...</p>
          </div>
        )
        setTimeout(() => {
          document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
        }, 400)
        break

      case lower === 'whoami':
        output = (
          <div className="text-xs sm:text-sm font-mono text-zinc-300">
            <p><span className="text-emerald-400 font-bold">guest@developer-portfolio</span></p>
            <p className="text-zinc-400 text-xs">Role: Portfolio Recruiter / Reviewer (Interactive Terminal Privileges Enabled)</p>
          </div>
        )
        break

      case lower === 'sudo':
        output = (
          <div className="text-xs sm:text-sm font-mono text-red-400">
            Permission denied: User is not in the sudoers file. This incident will be reported to Ranit.
          </div>
        )
        break

      case lower === 'date':
        output = <div className="text-xs sm:text-sm font-mono text-zinc-400">{new Date().toString()}</div>
        break

      case lower.startsWith('echo '):
        output = <div className="text-xs sm:text-sm font-mono text-zinc-300">{trimmed.slice(5)}</div>
        break

      default:
        output = (
          <div className="text-xs sm:text-sm font-mono text-red-400">
            Command not found: '{trimmed}'. Type <span className="text-emerald-400 font-bold">help</span> to list available commands.
          </div>
        )
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: trimmed,
        output
      }
    ])
    setInput('')
  }

  const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandList.length === 0) return
      const nextIdx = historyIndex < commandList.length - 1 ? historyIndex + 1 : historyIndex
      setHistoryIndex(nextIdx)
      setInput(commandList[commandList.length - 1 - nextIdx] || '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1
        setHistoryIndex(nextIdx)
        setInput(commandList[commandList.length - 1 - nextIdx] || '')
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput('')
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-background/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`relative w-full bg-[#0d1117] text-zinc-100 rounded-2xl overflow-hidden shadow-2xl border border-emerald-500/30 flex flex-col transition-all duration-300 ${
              isMaximized ? 'h-[96vh] max-w-[98vw]' : 'h-[80vh] max-w-4xl'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal Window Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-zinc-800 select-none">
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                  aria-label="Close"
                />
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
                  aria-label="Minimize"
                />
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
                  aria-label="Maximize"
                />
                <div className="flex items-center gap-2 ml-3 text-xs font-mono text-zinc-400">
                  <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ranit@portfolio:~ (zsh)</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 px-2 py-0.5 rounded bg-zinc-800/60 border border-zinc-700">
                  <Sparkles className="w-3 h-3 text-emerald-400" /> CLI Mode
                </span>
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="p-1 text-zinc-400 hover:text-zinc-200 transition-colors hidden sm:block"
                >
                  {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={onClose}
                  className="p-1 text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div
              className="flex-1 p-4 md:p-6 overflow-y-auto font-mono text-xs sm:text-sm space-y-4 bg-[#0d1117]/95"
              onClick={() => inputRef.current?.focus()}
            >
              {/* Welcome Header */}
              <div className="space-y-1 text-zinc-400 border-b border-zinc-800/80 pb-4">
                <p className="text-emerald-400 font-bold">Ranit Mondal Developer Portfolio Terminal [Version 1.0.0]</p>
                <p>(c) Ranit Mondal. Type <span className="text-emerald-400 font-bold">help</span> to view all commands or <span className="text-emerald-400 font-bold">cat cv.txt</span> to inspect resume.</p>
              </div>

              {/* History output */}
              {history.map((item) => (
                <div key={item.id} className="space-y-2">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <span className="text-emerald-400 font-bold">ranit@portfolio:~$</span>
                    <span className="font-bold">{item.command}</span>
                  </div>
                  <div className="pl-4">{item.output}</div>
                </div>
              ))}

              {/* Active Prompt Form */}
              <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 pt-2">
                <span className="text-emerald-400 font-bold flex-shrink-0">ranit@portfolio:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDownInput}
                  className="flex-1 bg-transparent text-zinc-100 outline-none border-none font-mono caret-emerald-400 text-xs sm:text-sm"
                  placeholder="type 'help'..."
                  autoComplete="off"
                  spellCheck={false}
                />
                <button type="submit" className="hidden sm:block text-zinc-500 hover:text-emerald-400 transition-colors">
                  <CornerDownLeft className="w-4 h-4" />
                </button>
              </form>

              <div ref={terminalEndRef} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
