import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  fetchGitHub,
  contributionChartUrl,
  topRepos,
} from '../../services/github'
import { profile } from '../../data/resume'
import MeshGradient from '../ui/MeshGradient'
import BrushedMetal from '../ui/BrushedMetal'
import MetalCard from '../ui/MetalCard'

function Star() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2 14.85 8.13l6.77.6-5.13 4.43 1.55 6.61L12 16.77 5.96 19.77l1.55-6.61L2.38 8.73l6.77-.6L12 2z" />
    </svg>
  )
}

function Fork() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="6" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="6" r="2" />
      <path d="M6 8v8" />
      <path d="M18 8a4 4 0 0 1-4 4H8" />
    </svg>
  )
}

const LANG_COLORS = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Go: '#00add8',
  Python: '#3572a5',
  CSS: '#563d7c',
  Solidity: '#aa6746',
  HTML: '#e34c26',
  Shell: '#89e051',
}

function Skeleton({ className = '' }) {
  return (
    <div
      className={`relative overflow-hidden rounded bg-white/[0.04] ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shine_1.6s_infinite] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </div>
  )
}

export default function GitHubSection() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchGitHub()
      .then(setData)
      .catch((e) => setError(e.message))
  }, [])

  const featured = data ? topRepos(data.repos, 6) : []
  const since = data
    ? new Date(data.profile.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      })
    : null

  return (
    <section
      id="github"
      className="min-h-screen w-full flex flex-col justify-center px-6 md:px-24 py-24 relative"
    >
      <MeshGradient className="opacity-50" />
      <BrushedMetal className="opacity-15" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12 flex-wrap gap-4"
        >
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.4em] text-zinc-500 mb-3">
              [ 04 ] · Live GitHub
            </p>
            <h2 className="text-4xl md:text-5xl font-light bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
              Code, in public
            </h2>
          </div>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
          >
            @{profile.handle} →
          </a>
        </motion.div>

        <div className="grid md:grid-cols-[1.1fr_1fr] gap-5 mb-5">
          <MetalCard glow="cyan" delay={0} hover className="!p-0">
            <div className="flex items-center gap-5">
              <div className="relative">
                {data ? (
                  <img
                    src={data.profile.avatar}
                    alt={data.profile.login}
                    className="h-20 w-20 rounded-full border-2 border-white/20"
                    style={{
                      boxShadow:
                        '0 0 0 4px rgba(0,0,0,0.6), 0 0 20px rgba(0,255,255,0.35)',
                    }}
                  />
                ) : (
                  <Skeleton className="h-20 w-20 rounded-full" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                  @{data?.profile.login ?? '—'}
                </p>
                <h3 className="text-2xl font-medium text-white truncate">
                  {data?.profile.name ?? profile.name}
                </h3>
                {data?.profile.location && (
                  <p className="text-zinc-500 text-sm">
                    📍 {data.profile.location}
                  </p>
                )}
              </div>
            </div>

            {data && (
              <div className="mt-6 grid grid-cols-4 gap-2 pt-6 border-t border-white/5">
                {[
                  { v: data.profile.publicRepos, l: 'Repos' },
                  { v: data.profile.followers, l: 'Followers' },
                  { v: data.profile.following, l: 'Following' },
                  { v: since, l: 'Since' },
                ].map((s) => (
                  <div key={s.l} className="text-center">
                    <div className="text-lg md:text-2xl font-black metal-text truncate">
                      {s.v}
                    </div>
                    <div className="text-[9px] font-mono uppercase tracking-[0.25em] text-zinc-500 mt-1">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </MetalCard>

          <MetalCard glow="purple" delay={0.1} hover className="!p-0">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 mb-3">
              Contribution Graph
            </p>
            <div className="rounded-lg bg-black/30 p-3 border border-white/5 overflow-hidden">
              {error ? (
                <p className="text-zinc-500 text-xs">
                  Graph unavailable. Visit GitHub for live stats.
                </p>
              ) : (
                <img
                  src={contributionChartUrl()}
                  alt="GitHub contribution graph"
                  className="w-full h-auto invert opacity-90"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              )}
            </div>
            <p className="text-[10px] text-zinc-600 mt-3 font-mono uppercase tracking-widest">
              Source: github.com · cached 1h
            </p>
          </MetalCard>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {error && (
            <p className="text-zinc-500 text-sm col-span-full">
              {error}. Showing only curated projects above.
            </p>
          )}

          {!data &&
            Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-40" />
            ))}

          {data &&
            featured.map((r, i) => (
              <motion.a
                key={r.id}
                href={r.htmlUrl}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ y: -3 }}
                className="group relative block overflow-hidden rounded-2xl border border-white/10 border-t-white/20 bg-gradient-to-br from-zinc-900/80 to-black p-5 transition-shadow hover:shadow-[0_10px_40px_-10px_rgba(0,255,255,0.3)]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(255,255,255,0.05),transparent_60%)] pointer-events-none" />
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-base font-medium text-white group-hover:text-cyan-300 transition-colors truncate">
                    {r.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-zinc-400 flex-shrink-0">
                    <span className="inline-flex items-center gap-1">
                      <Star /> {r.stars}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Fork /> {r.forks}
                    </span>
                  </div>
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3 min-h-[3em]">
                  {r.description || 'No description.'}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  {r.language ? (
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{
                          background: LANG_COLORS[r.language] ?? '#888',
                        }}
                      />
                      {r.language}
                    </span>
                  ) : (
                    <span />
                  )}
                  <span className="text-[10px] text-zinc-600 font-mono">
                    {new Date(r.updatedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      year: '2-digit',
                    })}
                  </span>
                </div>
              </motion.a>
            ))}
        </div>
      </div>
    </section>
  )
}
