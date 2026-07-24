import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, ArrowUpRight } from 'lucide-react'
import { FaLinkedin, FaGithub, FaFacebook, FaInstagram } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'

const NaukriIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm2.8 14.5h-2.2v-4.2c0-.9-.7-1.6-1.6-1.6s-1.6.7-1.6 1.6v4.2H7.2V9.5h2.2v1.1c.6-.8 1.6-1.3 2.7-1.3 1.9 0 3.5 1.6 3.5 3.5v3.7z" />
  </svg>
)

export interface SocialPlatform {
  name: string
  handle: string
  url: string
  category: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  gradient: string
  hoverBorder: string
}

export const socialPlatforms: SocialPlatform[] = [
  {
    name: 'LinkedIn',
    handle: 'ranitmmondal',
    url: 'https://www.linkedin.com/in/ranitmmondal/',
    category: 'Professional Network',
    description: 'Connect with me professionally, view my work experience and industry connections.',
    icon: FaLinkedin,
    color: '#0A66C2',
    gradient: 'from-[#0A66C2]/20 to-[#0A66C2]/5',
    hoverBorder: 'hover:border-[#0A66C2]/50'
  },
  {
    name: 'GitHub',
    handle: 'Ranit2004a',
    url: 'https://github.com/Ranit2004a',
    category: 'Code & Repositories',
    description: 'Explore my open source projects, full-stack web applications, and codebases.',
    icon: FaGithub,
    color: '#333333',
    gradient: 'from-muted/40 to-muted/10',
    hoverBorder: 'hover:border-foreground/40'
  },
  {
    name: 'LeetCode',
    handle: 'Ranit2004a',
    url: 'https://leetcode.com/u/ranit2002/',
    category: 'Problem Solving & DSA',
    description: 'Check out my algorithmic problem-solving track record and coding submissions.',
    icon: SiLeetcode,
    color: '#FFA116',
    gradient: 'from-[#FFA116]/20 to-[#FFA116]/5',
    hoverBorder: 'hover:border-[#FFA116]/50'
  },
  {
    name: 'Naukri',
    handle: 'Ranit Mondal',
    url: 'https://www.naukri.com/',
    category: 'Career & Jobs',
    description: 'View my professional profile, career highlights, and job-ready skills on Naukri.',
    icon: NaukriIcon,
    color: '#4A90E2',
    gradient: 'from-[#4A90E2]/20 to-[#4A90E2]/5',
    hoverBorder: 'hover:border-[#4A90E2]/50'
  },
  {
    name: 'Instagram',
    handle: '____r_a_n_i_t_____',
    url: 'https://www.instagram.com/____r_a_n_i_t_____/',
    category: 'Social & Creative',
    description: 'Follow my personal journey, tech updates, activities, and behind-the-scenes moments.',
    icon: FaInstagram,
    color: '#E4405F',
    gradient: 'from-[#E4405F]/20 to-[#E4405F]/5',
    hoverBorder: 'hover:border-[#E4405F]/50'
  },
  {
    name: 'Facebook',
    handle: 'Ranit Mondal',
    url: 'https://www.facebook.com/ranit.kumar.773/',
    category: 'Social Connection',
    description: 'Connect with me on Facebook for social updates and general networking.',
    icon: FaFacebook,
    color: '#1877F2',
    gradient: 'from-[#1877F2]/20 to-[#1877F2]/5',
    hoverBorder: 'hover:border-[#1877F2]/50'
  }
]

export default function SocialMedia() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section id="socials" className="py-24 md:py-32 relative overflow-hidden bg-background" ref={containerRef}>
      {/* Background Gradient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold uppercase tracking-wider mb-4 border border-primary/20"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Online Presence
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tight mb-6"
          >
            Connect With{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              Me Everywhere
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            Find me on code platforms, career portals, and social media. Let's network, collaborate, and share ideas!
          </motion.p>
        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {socialPlatforms.map((platform, index) => {
            const Icon = platform.icon
            return (
              <motion.a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`group relative flex flex-col justify-between p-8 rounded-3xl bg-card/60 backdrop-blur-md border border-border/80 ${platform.hoverBorder} transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden`}
              >
                {/* Background Card Highlight */}
                <div className={`absolute inset-0 bg-gradient-to-br ${platform.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                <div>
                  {/* Top Bar: Icon & Category */}
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: platform.color }}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-secondary/80 text-secondary-foreground border border-border">
                      {platform.category}
                    </span>
                  </div>

                  {/* Title & Handle */}
                  <div className="relative z-10 mb-3">
                    <h3 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                      {platform.name}
                    </h3>
                    <span className="text-sm font-medium text-muted-foreground font-mono">
                      @{platform.handle}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed relative z-10 mb-8">
                    {platform.description}
                  </p>
                </div>

                {/* Footer Action Button */}
                <div className="relative z-10 pt-4 border-t border-border/40 flex items-center justify-between text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                  <span className="inline-flex items-center gap-1.5">
                    Visit Profile <ExternalLink className="w-4 h-4" />
                  </span>
                  <div className="w-8 h-8 rounded-full bg-secondary/60 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
