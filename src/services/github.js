import { profile } from '../data/resume'

const USERNAME = profile.handle
const CACHE_KEY = `gh:${USERNAME}`
const CACHE_TTL = 60 * 60 * 1000

const HEADERS = { Accept: 'application/vnd.github+json' }
const FEATURED_REPOS = [
  'soothe',
  'modal-ml-inference',
  'py-game',
  'synclog',
  'TopoConnect',
  'BlockVote',
  'flipfull-web',
  'GoAnalytics',
]

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed?.ts || Date.now() - parsed.ts > CACHE_TTL) return null
    return parsed
  } catch {
    return null
  }
}

function writeCache(payload) {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ ...payload, ts: Date.now() }),
    )
  } catch {
    /* ignore quota errors */
  }
}

async function safeFetch(url) {
  const res = await fetch(url, { headers: HEADERS })
  if (!res.ok) throw new Error(`GitHub ${res.status}: ${url}`)
  return res.json()
}

export async function fetchGitHub() {
  const cached = readCache()
  if (cached) return cached

  const [user, repos] = await Promise.all([
    safeFetch(`https://api.github.com/users/${USERNAME}`),
    safeFetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`,
    ),
  ])

  const payload = {
    profile: {
      login: user.login,
      name: user.name,
      bio: user.bio,
      avatar: user.avatar_url,
      htmlUrl: user.html_url,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      createdAt: user.created_at,
      location: user.location,
    },
    repos: repos
      .filter((r) => !r.fork && !r.archived)
      .map((r) => ({
        id: r.id,
        name: r.name,
        htmlUrl: r.html_url,
        description: r.description,
        language: r.language,
        stars: r.stargazers_count,
        forks: r.forks_count,
        updatedAt: r.updated_at,
        topics: r.topics ?? [],
      })),
  }

  writeCache(payload)
  return payload
}

export function contributionChartUrl() {
  return `https://ghchart.rshah.org/${USERNAME}`
}

export function topRepos(repos, limit = 6) {
  const featuredRank = new Map(FEATURED_REPOS.map((name, i) => [name, i]))

  return [...repos]
    .sort((a, b) => {
      const ar = featuredRank.get(a.name) ?? Number.POSITIVE_INFINITY
      const br = featuredRank.get(b.name) ?? Number.POSITIVE_INFINITY
      if (ar !== br) return ar - br

      if (b.stars !== a.stars) return b.stars - a.stars
      if (Boolean(b.description) !== Boolean(a.description)) {
        return b.description ? -1 : 1
      }
      if ((b.topics?.length ?? 0) !== (a.topics?.length ?? 0)) {
        return (b.topics?.length ?? 0) - (a.topics?.length ?? 0)
      }
      return new Date(b.updatedAt) - new Date(a.updatedAt)
    })
    .slice(0, limit)
}
