import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { SiReact, SiTailwindcss, SiNodedotjs, SiMongodb, SiGithub, SiDocker, SiPython, SiKubernetes } from 'react-icons/si'
import { FaAws } from 'react-icons/fa'

const projects = [
  {
    id: 1,
    title: 'FLASHCHAT',
    category: 'Full Stack App',
    description: [
      'FlashChat is a full-stack real-time chat application built with React, Node.js, Express, MongoDB, and Socket.IO. It features JWT authentication, media uploads, email notifications, and scalable real-time communication using Redis. The application is containerized with Docker, deployed on a K3s Kubernetes cluster, and automated through a GitHub Actions CI/CD pipeline for reliable, scalable, and zero-downtime deployments'

    ],
    image: '/Flashchat.png',
    tech: [SiReact, SiTailwindcss, SiNodedotjs, SiDocker, FaAws],
    github: 'https://github.com/Ranit2004a/Chat-application',
    link: 'https://github.com/Ranit2004a/Chat-application'
  },
  {
    id: 2,
    title: 'Real-Time Collaborative Coding',
    category: 'Full Stack App',
    description: [
      'Built a real-time collaborative coding platform using React.js, Node.js, Express.js, Tailwind CSS, and Yjs for synchronized multi-user code editing.',
      'Designed shared coding rooms with concurrent multi-user editing and low-latency real-time collaboration features.',
      'Containerized and deployed on AWS ECS Fargate using Docker and Amazon ECR.'
    ],
    image: '/collab-coding.png',
    tech: [SiReact, SiTailwindcss, SiNodedotjs, SiDocker, FaAws],
    github: 'https://github.com/Ranit2004a/CollabeCode',
    link: 'https://github.com/Ranit2004a/CollabeCode'
  },
  {
    id: 3,
    title: 'GenAI Resume Intelligence',
    category: 'AI Platform',
    description: [
      'Developed an AI-powered platform for ATS-friendly resume generation and interview preparation.',
      'Integrated Google Gemini API for resume-job matching, skill-gap analysis, and personalized learning roadmap generation.',
      'Deployed the Dockerized MERN application on AWS EC2 with automated CI/CD pipelines using GitHub Actions.'
    ],
    image: '/resume-intelligence.png',
    tech: [SiReact, SiNodedotjs, SiMongodb, FaAws],
    github: 'https://github.com/Ranit2004a/AI-Interview-Prep',
    link: 'https://github.com/Ranit2004a/AI-Interview-Prep'
  },
  {
    id: 4,
    title: 'Notes App',
    category: 'Cloud-Native',
    description: [
      'Containerized and orchestrated a full-stack application using Docker and Kubernetes.',
      'Implemented Kubernetes HPA auto-scaling, Ingress routing, and service exposure for scalable deployment.',
      'Reduced deployment time by 95% through GitHub Actions-based CI/CD automation.'
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    tech: [SiNodedotjs, SiDocker, SiKubernetes],
    github: '#',
    link: '#'
  },
  {
    id: 5,
    title: 'AI Voice Assistant',
    category: 'Machine Learning',
    description: [
      'Built a modular voice assistant using Python and NLP techniques.',
      'Established speech recognition and automated system command execution functionalities.'
    ],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop',
    tech: [SiPython],
    github: '#',
    link: '#'
  }
]

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  return (
    <section id="projects" className="py-24 md:py-32 bg-secondary/10 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="h-[1px] w-12 bg-primary"></div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Selected Works</h2>
            </motion.div>
            <h3 className="text-4xl md:text-5xl font-bold"> Projects</h3>
          </div>
          <p className="text-muted-foreground text-right max-w-sm hidden md:block">
            A collection of projects where strategy meets high-end visual execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project.id)}
            >
              <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 bg-secondary/35 p-4 flex items-center justify-center border border-border/40">
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain rounded-xl group-hover:scale-[0.98] transition-transform duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                  <div className="w-16 h-16 rounded-full bg-background/90 backdrop-blur flex items-center justify-center text-primary transform scale-50 group-hover:scale-100 transition-transform duration-500 delay-100 shadow-xl">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  {project.category}
                </div>
                <h4 className="text-2xl font-bold group-hover:text-primary transition-colors">{project.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-card text-card-foreground rounded-3xl overflow-hidden shadow-2xl border border-border flex flex-col md:flex-row"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/50 hover:bg-background text-foreground backdrop-blur transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {(() => {
                const p = projects.find(x => x.id === selectedProject)
                if (!p) return null

                return (
                  <>
                    <div className="md:w-1/2 h-64 md:h-auto relative bg-secondary/20 p-6 flex items-center justify-center border-r border-border/40">
                      <img src={p.image} alt={p.title} className="w-full h-full object-contain rounded-2xl shadow-lg max-h-[300px] md:max-h-full" />
                    </div>
                    <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                      <div className="text-sm font-bold uppercase tracking-wider text-primary mb-2">
                        {p.category}
                      </div>
                      <h3 className="text-3xl font-bold mb-6">{p.title}</h3>
                      <div className="text-muted-foreground mb-8 text-lg space-y-3">
                        {Array.isArray(p.description) ? p.description.map((desc, i) => (
                          <p key={i} className="flex items-start gap-3">
                            <span className="text-primary mt-1.5 text-xl leading-none">•</span>
                            <span className="leading-relaxed">{desc}</span>
                          </p>
                        )) : (
                          <p className="leading-relaxed">{p.description}</p>
                        )}
                      </div>

                      <div className="mb-8">
                        <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Technologies</div>
                        <div className="flex gap-4">
                          {p.tech.map((Icon, i) => (
                            <Icon key={i} className="w-6 h-6 text-foreground" />
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-4 mt-auto">
                        <a href={p.link} target="_blank" rel="noreferrer" className="flex-1 inline-flex justify-center items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors">
                          View Code <ArrowUpRight className="w-4 h-4" />
                        </a>
                        <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex justify-center items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-full hover:bg-secondary/80 transition-colors">
                          <SiGithub className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </>
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
