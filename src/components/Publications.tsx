import { motion } from 'framer-motion'
import { BookOpen, ArrowUpRight, Award, Brain, ChevronRight } from 'lucide-react'

export default function Publications() {
  const tags = ["Machine Learning", "Healthcare AI", "Early Detection", "Bioinformatics", "Predictive Analytics"]

  const bullets = [
    "Accepted at CICBA-2024 (Paper ID: 203) — published in Springer proceedings.",
    "Engineered advanced machine learning-based prediction models and prognosis analysis optimized for early-stage lung cancer detection.",
    "Integrated statistical feature extraction techniques to improve classification accuracy and diagnostic reliability in healthcare systems."
  ]

  return (
    <section id="publications" className="py-24 md:py-32 relative overflow-hidden bg-secondary/5">
      {/* Dynamic Background Glow */}
      <div className="absolute right-1/4 top-1/3 -z-10 h-[350px] w-[350px] rounded-full bg-primary/10 opacity-20 blur-[120px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
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
                <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Research</h2>
              </motion.div>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Academic Publications</h3>
            </div>
            <p className="text-muted-foreground max-w-sm">
              Scientific contributions exploring the intersection of machine learning, healthcare, and predictive diagnostics.
            </p>
          </div>

          {/* Featured Publication Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative rounded-3xl p-8 md:p-12 border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-[0_0_40px_rgba(var(--primary-rgb),0.15)] transition-all duration-500"
          >
            {/* Ambient hover glow gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Left Column: Icon & Tags */}
              <div className="flex flex-col items-start lg:w-1/3 border-b lg:border-b-0 lg:border-r border-border pb-6 lg:pb-0 lg:pr-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-8 h-8" />
                </div>
                
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-bold border border-border/50 mb-6">
                  <Award className="w-3.5 h-3.5 text-primary" />
                  <span>CICBA 2024</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-2.5 py-1 rounded-md bg-secondary/40 text-muted-foreground text-xs font-medium hover:text-foreground hover:bg-secondary transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Title, Content & Links */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">Research Paper</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-border" />
                    <span className="text-xs text-muted-foreground">Paper ID: 203</span>
                  </div>

                  <h4 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors leading-tight mb-4">
                    Advancing Lung Cancer Diagnosis and Prognosis
                  </h4>

                  <p className="text-base text-muted-foreground leading-relaxed mb-6 font-medium">
                    A machine learning-based prediction and analysis framework designed for early detection of lung cancer, helping medical practitioners perform prognosis modeling with higher predictive validation.
                  </p>

                  <ul className="space-y-3.5 mb-8">
                    {bullets.map((bullet, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * idx, duration: 0.4 }}
                        className="flex items-start gap-3 text-muted-foreground text-sm leading-relaxed"
                      >
                        <span className="flex-shrink-0 mt-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                        <span>{bullet}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-4 mt-auto">
                  <a 
                    href="https://link.springer.com/chapter/10.1007/978-3-031-81339-9_24" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-semibold rounded-full overflow-hidden transition-all hover:scale-[1.03] active:scale-[0.97]"
                  >
                    <span>Read on Springer</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <a 
                    href="#contact"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-secondary text-secondary-foreground font-semibold rounded-full hover:bg-secondary/80 transition-colors border border-border/50"
                  >
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span>Inquire Research</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
