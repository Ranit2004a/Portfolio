import { motion } from 'framer-motion'
import { Award, GraduationCap, Cpu, CheckCircle2, Database } from 'lucide-react'
import { SiNvidia, SiPython, SiHtml5, SiDrupal } from 'react-icons/si'
import { FaJava } from 'react-icons/fa'

interface SpokenCert {
  name: string
  icon: any
  color: string
}

export default function Certifications() {
  const spokenCerts: SpokenCert[] = [
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "Java", icon: FaJava, color: "#E76F51" },
    { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
    { name: "RDBMS", icon: Database, color: "#4479A1" },
    { name: "Drupal", icon: SiDrupal, color: "#0077C0" }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  }

  return (
    <section id="certifications" className="py-24 md:py-32 relative overflow-hidden bg-secondary/3">
      {/* Background Orbits & Glows */}
      <div className="absolute left-1/3 top-1/2 -z-10 h-[350px] w-[350px] rounded-full bg-emerald-500/5 opacity-20 blur-[130px]" />
      <div className="absolute right-1/4 top-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-blue-500/5 opacity-20 blur-[100px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          
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
                <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Credentials</h2>
              </motion.div>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Professional Certifications</h3>
            </div>
            <p className="text-muted-foreground max-w-sm">
              Valued credentials proving theoretical foundations and hands-on technical proficiency.
            </p>
          </div>

          {/* Grid Container */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* NVIDIA GenAI Card */}
            <motion.div
              variants={cardVariants}
              className="group relative rounded-3xl p-8 md:p-10 border border-border bg-card overflow-hidden hover:border-emerald-500/40 hover:shadow-[0_0_45px_rgba(16,185,129,0.1)] transition-all duration-500 flex flex-col justify-between"
            >
              {/* Greenish glowing halo inside on card hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-border/80">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-105 transition-transform duration-300">
                      <SiNvidia className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-foreground">NVIDIA DLI</h4>
                      <p className="text-xs font-semibold text-muted-foreground">Deep Learning Institute</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold border border-emerald-500/20">
                    <Cpu className="w-3.5 h-3.5" />
                    GenAI Practice
                  </span>
                </div>

                <h4 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-emerald-400 transition-colors mb-4">
                  NVIDIA GenAI Practice Certification
                </h4>
                
                <p className="text-muted-foreground text-base leading-relaxed mb-6 font-medium">
                  Acquired extensive hands-on experience deploying state-of-the-art Generative AI systems. Trained models using industry standard prompt design frameworks, LLM workflows, and vector-embedded custom retrievals.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-500 flex-shrink-0" />
                    <span>Hands-on deployment of large language models and customized generative pipelines.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-500 flex-shrink-0" />
                    <span>Explored generative AI concepts, inference optimizations, and deployment strategies.</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-border/40 mt-auto">
                <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold border border-border/40">Generative AI</span>
                <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold border border-border/40">LLMs</span>
                <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold border border-border/40">NVIDIA DLI</span>
              </div>
            </motion.div>

            {/* IIT Bombay Spoken Tutorials Card */}
            <motion.div
              variants={cardVariants}
              className="group relative rounded-3xl p-8 md:p-10 border border-border bg-card overflow-hidden hover:border-blue-500/40 hover:shadow-[0_0_45px_rgba(59,130,246,0.1)] transition-all duration-500 flex flex-col justify-between"
            >
              {/* Blueish glowing halo inside on card hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-border/80">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-105 transition-transform duration-300">
                      <GraduationCap className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-foreground">IIT Bombay</h4>
                      <p className="text-xs font-semibold text-muted-foreground">Spoken Tutorials National Portal</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold border border-blue-500/20">
                    <Award className="w-3.5 h-3.5" />
                    National Level Certs
                  </span>
                </div>

                <h4 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-blue-400 transition-colors mb-4">
                  Spoken Tutorial Technical Certifications
                </h4>
                
                <p className="text-muted-foreground text-base leading-relaxed mb-6 font-medium">
                  Successfully completed comprehensive training modules and passed rigorous national level examinations administered by **IIT Bombay** on fundamental engineering technologies.
                </p>

                <div className="mb-6">
                  <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Certified Tech Stacks</div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {spokenCerts.map((cert, i) => {
                      const Icon = cert.icon
                      return (
                        <div 
                          key={i}
                          className="flex items-center gap-2 p-2.5 rounded-2xl bg-secondary/50 border border-border/40 hover:border-blue-500/30 hover:bg-background transition-all duration-300 group/item"
                        >
                          <div className="p-1.5 rounded-lg bg-background flex items-center justify-center border border-border/30">
                            <Icon className="w-4 h-4 group-hover/item:scale-110 transition-transform" style={{ color: cert.color }} />
                          </div>
                          <span className="text-sm font-bold text-muted-foreground group-hover/item:text-foreground transition-colors">{cert.name}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-border/40 mt-auto">
                <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold border border-border/40">IIT Bombay</span>
                <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold border border-border/40">FOSS Training</span>
                <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold border border-border/40">Open Source</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
