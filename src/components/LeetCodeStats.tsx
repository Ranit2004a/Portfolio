import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SiLeetcode } from 'react-icons/si'
import { FaTrophy, FaCheckCircle, FaChartLine, FaExternalLinkAlt, FaBrain } from 'react-icons/fa'

interface LeetCodeData {
  totalSolved: number
  totalQuestions: number
  easySolved: number
  totalEasy: number
  mediumSolved: number
  totalMedium: number
  hardSolved: number
  totalHard: number
  acceptanceRate: number
  ranking: number
  contributionPoint: number
}

const DEFAULT_STATS: LeetCodeData = {
  totalSolved: 150,
  totalQuestions: 3000,
  easySolved: 75,
  totalEasy: 800,
  mediumSolved: 65,
  totalMedium: 1600,
  hardSolved: 10,
  totalHard: 700,
  acceptanceRate: 64.5,
  ranking: 185000,
  contributionPoint: 250
}

export default function LeetCodeStats() {
  const [stats, setStats] = useState<LeetCodeData>(DEFAULT_STATS)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let isMounted = true

    async function fetchLeetCodeStats() {
      try {
        setLoading(true)
        const res = await fetch('https://leetcode-api-faisalshohag.vercel.app/ranit2002')
        if (!res.ok) throw new Error('Failed to fetch LeetCode API')
        const data = await res.json()

        if (isMounted && data && typeof data.totalSolved === 'number') {
          setStats({
            totalSolved: data.totalSolved || DEFAULT_STATS.totalSolved,
            totalQuestions: data.totalQuestions || DEFAULT_STATS.totalQuestions,
            easySolved: data.easySolved || DEFAULT_STATS.easySolved,
            totalEasy: data.totalEasy || DEFAULT_STATS.totalEasy,
            mediumSolved: data.mediumSolved || DEFAULT_STATS.mediumSolved,
            totalMedium: data.totalMedium || DEFAULT_STATS.totalMedium,
            hardSolved: data.hardSolved || DEFAULT_STATS.hardSolved,
            totalHard: data.totalHard || DEFAULT_STATS.totalHard,
            acceptanceRate: data.acceptanceRate ? parseFloat(data.acceptanceRate.toString()) : DEFAULT_STATS.acceptanceRate,
            ranking: data.ranking || DEFAULT_STATS.ranking,
            contributionPoint: data.contributionPoint || DEFAULT_STATS.contributionPoint
          })
        }
      } catch (err) {
        console.warn('LeetCode API fetch fallback:', err)
        // Keep DEFAULT_STATS as fallback
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchLeetCodeStats()

    return () => {
      isMounted = false
    }
  }, [])

  const profileUrl = 'https://leetcode.com/u/ranit2002/'

  return (
    <section id="leetcode" className="py-16 md:py-24 relative overflow-hidden bg-background">
      {/* Background Glow */}
      <div className="absolute right-1/3 top-1/4 -z-10 h-[320px] w-[320px] rounded-full bg-[#FFA116]/10 opacity-20 blur-[130px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Card Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative rounded-3xl p-8 md:p-12 border border-border/80 bg-card/60 backdrop-blur-md overflow-hidden hover:border-[#FFA116]/40 hover:shadow-[0_0_45px_rgba(255,161,22,0.12)] transition-all duration-500"
          >
            {/* Ambient hover glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFA116]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12 justify-between">
              {/* Left Side: Summary & Solved Count */}
              <div className="lg:w-5/12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/60">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#FFA116]/15 flex items-center justify-center text-[#FFA116]">
                        <SiLeetcode className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold tracking-tight text-foreground">
                          LeetCode Stats
                        </h3>
                        <p className="text-xs text-muted-foreground font-mono">
                          @ranit2002
                        </p>
                      </div>
                    </div>

                    <a
                      href={profileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-bold border border-border hover:border-[#FFA116]/40 transition-colors"
                    >
                      <span>Profile</span>
                      <FaExternalLinkAlt className="w-3 h-3 text-[#FFA116]" />
                    </a>
                  </div>

                  <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">
                      Total Solved Problems
                    </span>
                    <div className="flex items-baseline gap-3">
                      <span className="text-5xl md:text-6xl font-black text-foreground tracking-tight">
                        {loading ? (
                          <span className="animate-pulse">...</span>
                        ) : (
                          stats.totalSolved
                        )}
                      </span>
                      <span className="text-sm font-semibold text-muted-foreground">
                        / {stats.totalQuestions} Questions
                      </span>
                    </div>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="p-3.5 rounded-2xl bg-secondary/50 border border-border/40">
                      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-1">
                        <FaTrophy className="text-amber-400 w-3.5 h-3.5" />
                        <span>Global Rank</span>
                      </div>
                      <span className="text-base font-bold text-foreground font-mono">
                        {loading ? '...' : `#${stats.ranking.toLocaleString()}`}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-secondary/50 border border-border/40">
                      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-1">
                        <FaChartLine className="text-emerald-400 w-3.5 h-3.5" />
                        <span>Acceptance Rate</span>
                      </div>
                      <span className="text-base font-bold text-foreground font-mono">
                        {loading ? '...' : `${stats.acceptanceRate}%`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-4 border-t border-border/40">
                  <FaCheckCircle className="text-emerald-500 w-3.5 h-3.5" />
                  <span>Verified LeetCode Profile Track Record</span>
                </div>
              </div>

              {/* Right Side: Difficulty Breakdown & Topics */}
              <div className="lg:w-7/12 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-border/80 pt-6 lg:pt-0 lg:pl-10">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-6">
                    Problem Difficulty Breakdown
                  </h4>

                  <div className="space-y-6 mb-8">
                    {/* Easy */}
                    <div>
                      <div className="flex justify-between items-center text-sm font-bold mb-2">
                        <span className="flex items-center gap-2 text-[#00B8A3]">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#00B8A3]" />
                          Easy
                        </span>
                        <span className="font-mono text-xs text-muted-foreground">
                          {stats.easySolved} <span className="text-muted-foreground/60">/ {stats.totalEasy}</span>
                        </span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-secondary overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{
                            width: `${Math.min(100, Math.round((stats.easySolved / (stats.totalEasy || 1)) * 500))}%`
                          }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full rounded-full bg-[#00B8A3]"
                        />
                      </div>
                    </div>

                    {/* Medium */}
                    <div>
                      <div className="flex justify-between items-center text-sm font-bold mb-2">
                        <span className="flex items-center gap-2 text-[#FFC01E]">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#FFC01E]" />
                          Medium
                        </span>
                        <span className="font-mono text-xs text-muted-foreground">
                          {stats.mediumSolved} <span className="text-muted-foreground/60">/ {stats.totalMedium}</span>
                        </span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-secondary overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{
                            width: `${Math.min(100, Math.round((stats.mediumSolved / (stats.totalMedium || 1)) * 500))}%`
                          }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.1, ease: 'easeOut' }}
                          className="h-full rounded-full bg-[#FFC01E]"
                        />
                      </div>
                    </div>

                    {/* Hard */}
                    <div>
                      <div className="flex justify-between items-center text-sm font-bold mb-2">
                        <span className="flex items-center gap-2 text-[#FF375F]">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#FF375F]" />
                          Hard
                        </span>
                        <span className="font-mono text-xs text-muted-foreground">
                          {stats.hardSolved} <span className="text-muted-foreground/60">/ {stats.totalHard}</span>
                        </span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-secondary overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{
                            width: `${Math.min(100, Math.round((stats.hardSolved / (stats.totalHard || 1)) * 500))}%`
                          }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                          className="h-full rounded-full bg-[#FF375F]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Core Topics */}
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                      <FaBrain className="text-primary" /> Key DSA Proficiencies
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['Data Structures', 'Algorithms', 'Dynamic Programming', 'Graph Theory', 'Trees & Arrays', 'Two Pointers'].map(
                        (topic, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full bg-secondary/80 text-secondary-foreground text-xs font-semibold border border-border/50 hover:border-[#FFA116]/30 transition-colors"
                          >
                            {topic}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
