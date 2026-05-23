import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Download, ChevronDown } from 'lucide-react'
import { SiReact, SiNodedotjs, SiDocker, SiKubernetes } from 'react-icons/si'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98] as const
      }
    })
  }

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Gradient & Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]"></div>

      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-12"
      >
        <div className="flex-1 flex flex-col items-start gap-6">
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for new opportunities
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[1.1]">
            <motion.span
              custom={2} variants={textVariants} initial="hidden" animate="visible"
              className="block"
            >
              Hi, I'm
            </motion.span>
            <motion.span
              custom={3} variants={textVariants} initial="hidden" animate="visible"
              className="block bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50"
            >
              Ranit Mondal
            </motion.span>
          </h1>

          <motion.p
            custom={4} variants={textVariants} initial="hidden" animate="visible"
            className="text-xl md:text-2xl text-muted-foreground max-w-[600px] font-medium"
          >
            Backend-focused Full Stack Developer Engineering scalable web applications, real-time systems, and cloud-native solutions.
          </motion.p>

          <motion.div
            custom={5} variants={textVariants} initial="hidden" animate="visible"
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <a
              href="https://github.com/Ranit2004a?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
            </a>
            <a
              href="/cv.pdf"
              download="Ranit_Mondal_CV.pdf"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-full hover:bg-secondary/80 transition-colors"
            >
              <Download className="w-4 h-4" /> Download CV
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="flex-1 relative w-full max-w-md lg:max-w-lg aspect-square"
        >
          {/* Main Image Container */}
          <div className="relative w-full h-full rounded-full overflow-hidden border-[8px] border-background bg-secondary/20 shadow-2xl group ring-4 ring-border/50">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 rounded-full"></div>
            <img
              src="/profile.jpeg"
              alt="Profile"
              className="relative z-0 w-full h-full object-cover object-[center_15%] scale-100 group-hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
              }}
            />
          </div>

          {/* Floating Badges */}
          {/* React */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 -left-6 p-4 bg-background/80 backdrop-blur-md rounded-2xl border border-border shadow-xl flex items-center gap-3 z-20"
          >
            <SiReact className="w-8 h-8 text-[#61DAFB]" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-muted-foreground">Expert</span>
              <span className="text-sm font-bold">React</span>
            </div>
          </motion.div>

          {/* Docker */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-1/3 -right-8 p-4 bg-background/80 backdrop-blur-md rounded-2xl border border-border shadow-xl flex items-center gap-3 z-20"
          >
            <SiDocker className="w-8 h-8 text-[#2496ED]" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-muted-foreground">DevOps</span>
              <span className="text-sm font-bold">Docker</span>
            </div>
          </motion.div>

          {/* Kubernetes */}
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute bottom-1/4 -left-8 p-4 bg-background/80 backdrop-blur-md rounded-2xl border border-border shadow-xl flex items-center gap-3 z-20"
          >
            <SiKubernetes className="w-8 h-8 text-[#326CE5]" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-muted-foreground">Scale</span>
              <span className="text-sm font-bold">K8s</span>
            </div>
          </motion.div>

          {/* Node.js */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-6 right-10 p-4 bg-background/80 backdrop-blur-md rounded-2xl border border-border shadow-xl flex items-center gap-3 z-20"
          >
            <SiNodedotjs className="w-8 h-8 text-[#339933]" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-muted-foreground">Backend</span>
              <span className="text-sm font-bold">Node.js</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  )
}
