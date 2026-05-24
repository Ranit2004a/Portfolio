import { motion } from 'framer-motion'
import { Briefcase, Calendar, ChevronRight } from 'lucide-react'
import { SiReact, SiTailwindcss, SiTypescript } from 'react-icons/si'

interface ExperienceItem {
  role: string
  company: string
  duration: string
  bullets: string[]
  skills: string[]
}

const experiences: ExperienceItem[] = [
  {
    role: "Frontend & UI Developer Intern",
    company: "Eastern Coalfields Limited (ECL)",
    duration: "Jul 2024 – Aug 2024",
    bullets: [
      "Built a custom React typing animation that smoothly renders “Ranit Mondal” character-by-character in a continuous loop. The sequence includes controlled typing, idle timing, and seamless backspacing transitions to create a clean cinematic effect without layout shifting.",
      "Integrated a pulsing sky-blue cursor that reacts to typing activity and gracefully fades away during idle states, maintaining a minimal and polished interface.",
      "Implemented non-breaking fallback rendering to prevent text collapse and unwanted layout movement during animation resets.",
      "Configured clean type handling and optimized build stability to ensure error-free Vite production compilation."
    ],
    skills: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite", "UI/UX Animation", "System Design"]
  }
]

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 bg-secondary/10 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute left-1/4 top-1/2 -z-10 h-[300px] w-[300px] rounded-full bg-cyan-500/10 opacity-20 blur-[100px]" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-4"
              >
                <div className="h-[1px] w-12 bg-primary"></div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Journey</h2>
              </motion.div>
              <h3 className="text-4xl md:text-5xl font-bold">Work Experience</h3>
            </div>
            <p className="text-muted-foreground max-w-sm">
              My professional milestones, internship contributions, and technical impact.
            </p>
          </div>

          {/* Timeline Container */}
          <div className="relative border-l border-border pl-6 md:pl-8 ml-4 space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative"
              >
                {/* Timeline node */}
                <div className="absolute -left-[41px] md:-left-[49px] top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-background border-2 border-primary shadow-sm text-primary z-10">
                  <Briefcase className="w-4 h-4" />
                </div>

                {/* Experience Card */}
                <div className="group relative rounded-3xl p-6 md:p-8 border border-border bg-background overflow-hidden hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] transition-all duration-300">
                  {/* Decorative glowing gradient inside the card on hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10">
                    {/* Header: Role, Company & Date */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-border">
                      <div>
                        <h4 className="text-2xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                          {exp.role}
                        </h4>
                        <p className="text-lg font-semibold text-muted-foreground mt-1">
                          {exp.company}
                        </p>
                      </div>
                      
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium border border-border/50 self-start md:self-center">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{exp.duration}</span>
                      </div>
                    </div>

                    {/* Bullet Points */}
                    <ul className="space-y-4 mb-8">
                      {exp.bullets.map((bullet, bIdx) => (
                        <motion.li
                          key={bIdx}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + bIdx * 0.1, duration: 0.4 }}
                          className="flex items-start gap-3 text-muted-foreground leading-relaxed text-base group-hover:text-foreground/90 transition-colors"
                        >
                          <span className="flex-shrink-0 mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-cyan-500/20 group-hover:text-cyan-500 transition-all duration-300">
                            <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                          <span>{bullet}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Tech Badges */}
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                        Key Technologies & Methodologies
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, sIdx) => {
                          // Dynamic rendering of specific tech icons if helpful
                          const isReact = skill.toLowerCase().includes('react');
                          const isTailwind = skill.toLowerCase().includes('tailwind');
                          const isTypeScript = skill.toLowerCase().includes('typescript');

                          return (
                            <span
                              key={sIdx}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-secondary/80 text-secondary-foreground text-xs font-bold border border-border/55 hover:border-cyan-400/40 hover:bg-background transition-all duration-200"
                            >
                              {isReact && <SiReact className="w-3 h-3 text-[#61DAFB]" />}
                              {isTailwind && <SiTailwindcss className="w-3 h-3 text-[#06B6D4]" />}
                              {isTypeScript && <SiTypescript className="w-3 h-3 text-[#3178C6]" />}
                              {skill}
                            </span>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
