import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '../lib/utils'
import { Code, Layout, Server, Database, Cloud, Wrench, Brain as BrainIcon } from 'lucide-react'

// Icons imports for the bubble cloud
import {
  SiReact,
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiTailwindcss,
  SiNodedotjs,
  SiCplusplus,
  SiAnsible,
  SiPython,
  SiMongodb,
  SiMysql
} from 'react-icons/si'
import { FaJava, FaAws } from 'react-icons/fa'

// Define the type for the bubble
interface Bubble {
  name: string
  icon?: any
  color: string
  size: number
  baseX: number
  baseY: number
  isCenter?: boolean
  isDot?: boolean
}

// Hand-crafted coordinate system matching the concentric bubbles fanning
const bubblesData: Bubble[] = [
  // Center C++ bubble
  {
    name: "C++",
    icon: SiCplusplus,
    color: "#00599C",
    size: 130,
    baseX: 0,
    baseY: 0,
    isCenter: true
  },

  // Inner Ring
  {
    name: "React",
    icon: SiReact,
    color: "#61DAFB",
    size: 95,
    baseX: -110,
    baseY: -70
  },
  {
    name: "Python",
    icon: SiPython,
    color: "#3776AB",
    size: 95,
    baseX: -120,
    baseY: 60
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    color: "#339933",
    size: 95,
    baseX: 110,
    baseY: -70
  },
  {
    name: "Docker",
    icon: SiDocker,
    color: "#2496ED",
    size: 95,
    baseX: 120,
    baseY: 60
  },
  {
    name: "Java",
    icon: FaJava,
    color: "#E76F51",
    size: 95,
    baseX: 0,
    baseY: -130
  },

  // Outer Ring
  {
    name: "K8s",
    icon: SiKubernetes,
    color: "#326CE5",
    size: 85,
    baseX: -220,
    baseY: -100
  },
  {
    name: "Terraform",
    icon: SiTerraform,
    color: "#844FBA",
    size: 85,
    baseX: -230,
    baseY: 40
  },
  {
    name: "Tailwind",
    icon: SiTailwindcss,
    color: "#06B6D4",
    size: 85,
    baseX: 220,
    baseY: -100
  },
  {
    name: "AWS",
    icon: FaAws,
    color: "#FF9900",
    size: 85,
    baseX: 230,
    baseY: 40
  },
  {
    name: "Ansible",
    icon: SiAnsible,
    color: "#EE0000",
    size: 85,
    baseX: -100,
    baseY: 190
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
    color: "#47A248",
    size: 85,
    baseX: 100,
    baseY: 190
  },
  {
    name: "MySQL",
    icon: SiMysql,
    color: "#4479A1",
    size: 90,
    baseX: 0,
    baseY: 230
  },

  // accent bubbles
  { name: "", color: "#EAB308", size: 16, baseX: -280, baseY: -30, isDot: true },
  { name: "", color: "#F97316", size: 20, baseX: 0, baseY: -240, isDot: true },
  { name: "", color: "#22C55E", size: 16, baseX: 280, baseY: 100, isDot: true },
  { name: "", color: "#EC4899", size: 18, baseX: 280, baseY: -160, isDot: true },
  { name: "", color: "#EF4444", size: 20, baseX: 0, baseY: 300, isDot: true },
  { name: "", color: "#3B82F6", size: 15, baseX: -280, baseY: 150, isDot: true }
]

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Real-time mouse calculations coordinate triggers
  const mouseRef = useRef({ x: 0, y: 0, active: false })

  // Springs setup for rebounding reactive bubbles
  const springs = useRef(
    bubblesData.map(b => {
      const x = useMotionValue(b.baseX)
      const y = useMotionValue(b.baseY)

      const springX = useSpring(x, { stiffness: 250, damping: 24, mass: 0.25 })
      const springY = useSpring(y, { stiffness: 250, damping: 24, mass: 0.25 })

      return { x, y, springX, springY }
    })
  )

  const [scaleFactor, setScaleFactor] = useState(1)

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
      if (w < 480) {
        setScaleFactor(0.4)
      } else if (w < 768) {
        setScaleFactor(0.55)
      } else if (w < 1024) {
        setScaleFactor(0.7)
      } else if (w < 1280) {
        setScaleFactor(0.75)
      } else {
        setScaleFactor(0.8)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Sinusoidal drift + mouse repulsion ticker
  useEffect(() => {
    let animationFrameId: number
    let time = 0

    const tick = () => {
      time += 0.015

      const { x: mX, y: mY, active } = mouseRef.current
      const scale = scaleFactor

      bubblesData.forEach((b, idx) => {
        const spr = springs.current[idx]

        const driftFrequency = 0.8 + (idx % 3) * 0.25
        const driftAmplitude = b.isCenter ? 3 : (b.isDot ? 12 : 7)

        const driftX = Math.sin(time * driftFrequency + idx * 1.5) * driftAmplitude * scale
        const driftY = Math.cos(time * driftFrequency * 0.9 + idx * 2.1) * driftAmplitude * scale

        const targetBaseX = (b.baseX * scale) + driftX
        const targetBaseY = (b.baseY * scale) + driftY

        if (active) {
          const dx = targetBaseX - mX
          const dy = targetBaseY - mY
          const dist = Math.sqrt(dx * dx + dy * dy)

          const repulsionRadius = (160 + (b.size * 0.15)) * scale
          const maxPushForce = (100 + (b.size * 0.1)) * scale

          if (dist < repulsionRadius && dist > 0) {
            const factor = (repulsionRadius - dist) / repulsionRadius
            const pushX = (dx / dist) * maxPushForce * factor
            const pushY = (dy / dist) * maxPushForce * factor

            spr.x.set(targetBaseX + pushX)
            spr.y.set(targetBaseY + pushY)
          } else {
            spr.x.set(targetBaseX)
            spr.y.set(targetBaseY)
          }
        } else {
          spr.x.set(targetBaseX)
          spr.y.set(targetBaseY)
        }
      })

      animationFrameId = requestAnimationFrame(tick)
    }

    animationFrameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animationFrameId)
  }, [scaleFactor])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const x = e.clientX - rect.left - centerX
    const y = e.clientY - rect.top - centerY

    mouseRef.current = { x, y, active: true }
  }

  const handleMouseLeave = () => {
    mouseRef.current = { x: 0, y: 0, active: false }
  }

  const skillCategories = [
    {
      title: "Languages",
      icon: Code,
      color: "text-[#3776AB]",
      skills: ["Python", "C++", "Java", "JavaScript"]
    },
    {
      title: "Frontend",
      icon: Layout,
      color: "text-[#61DAFB]",
      skills: ["React.js", "HTML5", "CSS3", "Tailwind CSS"]
    },
    {
      title: "Backend",
      icon: Server,
      color: "text-[#339933]",
      skills: ["Node.js", "Express.js", "Flask", "REST APIs", "Microservices"]
    },
    {
      title: "Databases",
      icon: Database,
      color: "text-[#47A248]",
      skills: ["MongoDB", "MySQL", "SQLite"]
    },
    {
      title: "Cloud & DevOps",
      icon: Cloud,
      color: "text-[#FF9900]",
      skills: ["AWS (EC2, ECS, ECR, Lambda, S3)", "Docker", "Kubernetes", "Terraform", "GitHub Actions"]
    },
    {
      title: "Tools",
      icon: Wrench,
      color: "text-[#EE0000]",
      skills: ["Git", "GitHub", "Postman"]
    },
    {
      title: "ML & Data",
      icon: BrainIcon,
      color: "text-[#844FBA]",
      skills: ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "OpenCV"]
    }
  ]

  return (
    <section id="skills" className="py-24 md:py-32 overflow-hidden relative">
      {/* Background radial gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-6xl mx-auto mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="h-[1px] w-12 bg-primary"></div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Technical </h2>
            </motion.div>
            <h3 className="text-4xl md:text-5xl font-bold">Skills </h3>
          </div>
          <p className="text-muted-foreground max-w-sm">
            Hover over the floating interactive bubble cloud or explore my fully categorized technical proficiencies.
          </p>
        </div>

        {/* Dual Responsive Layout */}
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left Column: Interactive Bubble Cloud */}
          <div className="w-full lg:w-[45%] flex items-center justify-center select-none">
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-[480px] aspect-square flex items-center justify-center cursor-default overflow-visible select-none"
            >
              {/* Background Concentric Orbits (fanning lines) */}
              <div
                className="absolute rounded-full border border-dashed border-border/30 dark:border-zinc-800/40 pointer-events-none transition-all duration-300"
                style={{
                  width: 260 * 2 * scaleFactor,
                  height: 260 * 2 * scaleFactor,
                }}
              />
              <div
                className="absolute rounded-full border border-dashed border-border/40 dark:border-zinc-800/60 pointer-events-none transition-all duration-300"
                style={{
                  width: 140 * 2 * scaleFactor,
                  height: 140 * 2 * scaleFactor,
                }}
              />
              <div
                className="absolute rounded-full border border-zinc-200/40 dark:border-zinc-800/30 pointer-events-none transition-all duration-300"
                style={{
                  width: 50 * 2 * scaleFactor,
                  height: 50 * 2 * scaleFactor,
                }}
              />

              {/* Render Bubble Elements */}
              {bubblesData.map((bubble, idx) => {
                const spr = springs.current[idx]
                const size = bubble.size * scaleFactor

                return (
                  <motion.div
                    key={idx}
                    style={{
                      x: spr.springX,
                      y: spr.springY,
                      width: size,
                      height: size,
                      marginLeft: -size / 2,
                      marginTop: -size / 2,
                    }}
                    className={cn(
                      "absolute left-1/2 top-1/2 rounded-full flex items-center justify-center transition-all duration-500 pointer-events-none select-none group",
                      bubble.isDot
                        ? "shadow-sm opacity-80"
                        : "bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:scale-110"
                    )}
                  >
                    {bubble.isDot ? (
                      <div
                        className="w-full h-full rounded-full animate-pulse"
                        style={{
                          backgroundColor: bubble.color,
                          boxShadow: `0 0 15px ${bubble.color}50`
                        }}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center w-full h-full p-2 relative rounded-full overflow-hidden">
                        <div
                          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                          style={{
                            background: `radial-gradient(circle, ${bubble.color} 0%, transparent 70%)`
                          }}
                        />
                        <div
                          className="absolute inset-0 rounded-full border border-transparent group-hover:border-current transition-colors duration-300 pointer-events-none opacity-20"
                          style={{ color: bubble.color }}
                        />
                        {bubble.icon && (
                          <bubble.icon
                            className={cn(
                              "transition-transform duration-300 group-hover:scale-105",
                              bubble.isCenter ? "w-8 h-8 md:w-10 md:h-10" : "w-5 h-5 md:w-7 md:h-7"
                            )}
                            style={{ color: bubble.color }}
                          />
                        )}
                        {bubble.name && (
                          <span
                            className={cn(
                              "font-extrabold tracking-wider text-muted-foreground dark:text-zinc-400 group-hover:text-foreground transition-colors uppercase mt-1 select-none",
                              bubble.isCenter ? "text-[8px] md:text-[10px]" : "text-[6px] md:text-[8px]"
                            )}
                          >
                            {bubble.name}
                          </span>
                        )}
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Right Column: Structured Categorized Skills Grid */}
          <div className="flex-1 w-full">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {skillCategories.map((category, idx) => {
                const Icon = category.icon
                return (
                  <motion.div
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                    }}
                    className="group relative p-5 md:p-6 rounded-3xl border border-border bg-card/40 backdrop-blur-md overflow-hidden hover:border-primary/30 transition-all duration-300 shadow-sm"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="flex items-center gap-3 mb-4">
                      <div className={cn("p-2 rounded-xl bg-secondary border border-border/30", category.color)}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="font-extrabold text-base tracking-tight text-foreground">{category.title}</h4>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-3 py-1 rounded-xl bg-secondary/50 text-muted-foreground text-xs font-bold border border-border/40 hover:text-foreground hover:bg-secondary hover:border-primary/20 transition-all duration-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
