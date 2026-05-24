import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'

const stats = [
  { label: 'Projects Built', value: 10, suffix: '+' },
  { label: 'Tech Stack', value: 15, suffix: '+' },
  { label: 'Pass Out Year', value: 2026, suffix: '' },
]

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (textRef.current) {
      const text = textRef.current
      const chars = text.innerText.split('')
      text.innerHTML = ''
      chars.forEach(char => {
        const span = document.createElement('span')
        span.innerText = char
        span.style.opacity = '0'
        text.appendChild(span)
      })

      gsap.to(text.children, {
        opacity: 1,
        stagger: 0.02,
        duration: 0.1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: text,
          start: "top 80%",
        }
      })
    }
  }, [])

  return (
    <section id="about" className="py-24 md:py-32 bg-secondary/20 relative">
      <div className="container mx-auto px-4 md:px-6" ref={containerRef}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-[1px] w-12 bg-primary"></div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary">About Me</h2>
          </motion.div>

          <h3
            ref={textRef}
            className="text-3xl md:text-5xl font-bold leading-tight mb-12 text-balance"
          >
            I am a Backend-focused Full Stack Developer with experience building scalable web applications, REST APIs, real-time collaborative systems, and cloud-native deployments.
          </h3>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-6 text-lg text-muted-foreground"
            >
              <p>
                Currently pursuing a B.Tech in Computer Science and Engineering (Data Science) at Dr. B.C. Roy Engineering College, Durgapur. My approach is defined by a rigorous attention to system design, containerization, and deployment automation.
              </p>
              <p>
                I specialize in the MERN Stack, Docker, Kubernetes, AWS ECS/Fargate, CI/CD pipelines, and microservices architecture. With a proven track record including software engineering internships, I craft robust and efficient digital solutions that scale seamlessly.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + (index * 0.1), duration: 0.5 }}
                  className={`p-6 rounded-2xl bg-background border border-border flex flex-col justify-center ${index === 2 ? 'col-span-2' : ''
                    }`}
                >
                  <div className="text-4xl md:text-5xl font-black text-primary mb-2">
                    {isInView ? <Counter from={0} to={stat.value} /> : '0'}
                    {stat.suffix}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Counter({ from, to }: { from: number, to: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const node = nodeRef.current
    if (node) {
      const controls = gsap.to({ val: from }, {
        val: to,
        duration: 2,
        ease: "power2.out",
        onUpdate: function () {
          node.innerText = Math.floor(this.targets()[0].val).toString()
        }
      })
      return () => { controls.kill() }
    }
  }, [from, to])

  return <span ref={nodeRef} />
}
