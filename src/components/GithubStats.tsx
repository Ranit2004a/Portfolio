import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaStar, FaCodeBranch, FaUsers, FaCode, FaExternalLinkAlt, FaBookOpen } from 'react-icons/fa'
import { useTheme } from './ThemeProvider'

interface GithubUserData {
  public_repos: number
  followers: number
  following: number
  avatar_url: string
  html_url: string
  bio: string
  name: string
  login: string
}

interface LanguageStat {
  name: string
  count: number
  percentage: number
  color: string
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Python: '#3776AB',
  'C++': '#00599C',
  Java: '#E76F51',
  HTML: '#E34F26',
  CSS: '#1572B6',
  Dockerfile: '#2496ED',
  Shell: '#89E051',
  Jupyter: '#DA5B0B'
}

export default function GithubStats() {
  const { theme } = useTheme()
  const [userData, setUserData] = useState<GithubUserData | null>(null)
  const [totalStars, setTotalStars] = useState<number>(0)
  const [totalForks, setTotalForks] = useState<number>(0)
  const [topLanguages, setTopLanguages] = useState<LanguageStat[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [, setError] = useState<boolean>(false)

  useEffect(() => {
    let isMounted = true

    async function fetchGithubData() {
      try {
        setLoading(true)
        // Fetch User Info
        const userRes = await fetch('https://api.github.com/users/Ranit2004a')
        if (!userRes.ok) throw new Error('Failed to fetch GitHub user')
        const userJson = await userRes.json()

        // Fetch Repositories Info
        const reposRes = await fetch('https://api.github.com/users/Ranit2004a/repos?per_page=100&sort=updated')
        if (!reposRes.ok) throw new Error('Failed to fetch repos')
        const reposJson = await reposRes.json()

        if (isMounted && Array.isArray(reposJson)) {
          setUserData(userJson)

          let stars = 0
          let forks = 0
          const langCounts: Record<string, number> = {}

          reposJson.forEach((repo: any) => {
            stars += repo.stargazers_count || 0
            forks += repo.forks_count || 0

            if (repo.language) {
              langCounts[repo.language] = (langCounts[repo.language] || 0) + 1
            }
          })

          setTotalStars(stars)
          setTotalForks(forks)

          // Calculate language percentages
          const totalLangRepos = Object.values(langCounts).reduce((a, b) => a + b, 0)
          const sortedLangs: LanguageStat[] = Object.entries(langCounts)
            .map(([name, count]) => ({
              name,
              count,
              percentage: totalLangRepos > 0 ? Math.round((count / totalLangRepos) * 100) : 0,
              color: LANGUAGE_COLORS[name] || '#8B5CF6'
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5)

          setTopLanguages(sortedLangs)
        }
      } catch (err) {
        console.error('Error loading GitHub stats:', err)
        if (isMounted) setError(true)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchGithubData()

    return () => {
      isMounted = false
    }
  }, [])

  const username = 'Ranit2004a'
  const isDark = theme === 'dark'
  const chartTheme = isDark ? 'dark' : 'light'

  return (
    <section id="github" className="py-24 md:py-32 relative overflow-hidden bg-secondary/5">
      {/* Glow Orbs */}
      <div className="absolute left-1/4 top-1/3 -z-10 h-[380px] w-[380px] rounded-full bg-primary/10 opacity-25 blur-[140px] pointer-events-none" />
      <div className="absolute right-1/4 bottom-10 -z-10 h-[300px] w-[300px] rounded-full bg-purple-500/10 opacity-20 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-4"
              >
                <div className="h-[1px] w-12 bg-primary"></div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Open Source Activity</h2>
              </motion.div>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tight flex items-center gap-3">
                <FaGithub className="text-primary" /> Live GitHub Ecosystem
              </h3>
            </div>
            <p className="text-muted-foreground max-w-md">
              Real-time synchronization with GitHub REST API displaying repository metrics, language analysis, and contribution activity.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-3xl bg-card border border-border/80 flex flex-col justify-between hover:border-primary/40 transition-colors shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Repositories</span>
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                  <FaBookOpen className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-extrabold text-foreground mb-1">
                  {loading ? <span className="animate-pulse">...</span> : userData?.public_repos || 15}
                </div>
                <span className="text-xs text-muted-foreground font-medium">Public Codebases</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-3xl bg-card border border-border/80 flex flex-col justify-between hover:border-amber-400/40 transition-colors shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Stars Earned</span>
                <div className="p-3 rounded-2xl bg-amber-400/10 text-amber-400">
                  <FaStar className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-extrabold text-foreground mb-1">
                  {loading ? <span className="animate-pulse">...</span> : totalStars}
                </div>
                <span className="text-xs text-muted-foreground font-medium">Community Stars</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-3xl bg-card border border-border/80 flex flex-col justify-between hover:border-cyan-400/40 transition-colors shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Forks</span>
                <div className="p-3 rounded-2xl bg-cyan-400/10 text-cyan-400">
                  <FaCodeBranch className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-extrabold text-foreground mb-1">
                  {loading ? <span className="animate-pulse">...</span> : totalForks}
                </div>
                <span className="text-xs text-muted-foreground font-medium">Project Clones</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-3xl bg-card border border-border/80 flex flex-col justify-between hover:border-emerald-400/40 transition-colors shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Followers</span>
                <div className="p-3 rounded-2xl bg-emerald-400/10 text-emerald-400">
                  <FaUsers className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-extrabold text-foreground mb-1">
                  {loading ? <span className="animate-pulse">...</span> : userData?.followers || 0}
                </div>
                <span className="text-xs text-muted-foreground font-medium">Network Connections</span>
              </div>
            </motion.div>
          </div>

          {/* Languages & Heatmap Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Top Languages Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-card border border-border/80 flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/60">
                  <h4 className="text-lg font-bold tracking-tight flex items-center gap-2">
                    <FaCode className="text-primary" /> Top Code Languages
                  </h4>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary text-muted-foreground">
                    Live Analysis
                  </span>
                </div>

                <div className="space-y-5">
                  {topLanguages.length > 0 ? (
                    topLanguages.map((lang) => (
                      <div key={lang.name} className="space-y-2">
                        <div className="flex justify-between items-center text-sm font-semibold">
                          <span className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: lang.color }} />
                            {lang.name}
                          </span>
                          <span className="text-muted-foreground font-mono text-xs">{lang.percentage}%</span>
                        </div>
                        <div className="w-full h-2.5 rounded-full bg-secondary overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${lang.percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: lang.color }}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="space-y-4">
                      {['TypeScript', 'Python', 'JavaScript', 'C++', 'HTML/CSS'].map((name) => (
                        <div key={name} className="space-y-2">
                          <div className="flex justify-between items-center text-sm font-semibold">
                            <span>{name}</span>
                            <span className="text-xs text-muted-foreground">--%</span>
                          </div>
                          <div className="w-full h-2.5 rounded-full bg-secondary animate-pulse" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t border-border/40 mt-6 text-xs text-muted-foreground">
                Calculated automatically across all public repositories.
              </div>
            </motion.div>

            {/* Contribution Heatmap Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 p-8 rounded-3xl bg-card border border-border/80 flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/60">
                  <h4 className="text-lg font-bold tracking-tight">
                    Contribution Heatmap & Commit Graph
                  </h4>
                  <a
                    href={`https://github.com/${username}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                  >
                    @Ranit2004a <FaExternalLinkAlt className="w-3 h-3" />
                  </a>
                </div>

                {/* Heatmap Image Widget */}
                <div className="w-full overflow-x-auto py-2 flex justify-center items-center rounded-2xl bg-secondary/30 border border-border/40 p-4">
                  <img
                    src={`https://ghchart.rshah.org/${isDark ? '06b6d4' : '0284c7'}/${username}`}
                    alt="Ranit Mondal GitHub Contribution Heatmap"
                    className="w-full max-w-full h-auto object-contain filter drop-shadow-sm min-w-[600px]"
                    onError={(e) => {
                      // Fallback image if chart API is throttled
                      e.currentTarget.src = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${chartTheme}&hide_border=true&bg_color=00000000`
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border/40 mt-6">
                <p className="text-xs text-muted-foreground">
                  Continuous commitment to clean code, open source building, and daily repository pushes.
                </p>
                <a
                  href={`https://github.com/${username}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-transform active:scale-95 text-xs whitespace-nowrap shadow-md"
                >
                  <FaGithub className="w-4 h-4" /> View Profile on GitHub
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
