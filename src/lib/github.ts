/**
 * GitHub data fetchers — invoked from .astro frontmatter (runs at build time).
 * No client-side JS, no exposed tokens.
 *
 * Configuration (env vars):
 *   GITHUB_USERNAME   required for any data
 *   GITHUB_TOKEN      optional; required only for contributions calendar
 *
 * If a request fails or env is missing, fetchers return null/empty.
 * Components must render gracefully when data is absent.
 */

const GH_REST = 'https://api.github.com';
const GH_GQL = 'https://api.github.com/graphql';

const env = (key: string): string | undefined =>
  // Astro exposes env vars (loaded from .env at build time) on import.meta.env
  (import.meta.env as Record<string, string | undefined>)?.[key];

const username = (): string | null => env('GITHUB_USERNAME') ?? null;
const token = (): string | null => env('GITHUB_TOKEN') ?? null;

const cache = new Map<string, Promise<unknown>>();

const memo = <T>(key: string, fn: () => Promise<T>): Promise<T> => {
  if (!cache.has(key)) cache.set(key, fn());
  return cache.get(key) as Promise<T>;
};

const headers = (): Record<string, string> => {
  const h: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'profile-pro-build',
  };
  const t = token();
  if (t) h.Authorization = `Bearer ${t}`;
  return h;
};

// ─────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────

export interface GhProfile {
  login: string;
  name: string | null;
  publicRepos: number;
  followers: number;
  createdAt: string;
}

export interface GhRepo {
  name: string;
  fullName: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  forks: number;
  pushedAt: string;
  isFork: boolean;
  isArchived: boolean;
}

export interface GhLanguage {
  name: string;
  bytes: number;
  share: number;
}

export interface GhContributionWeek {
  total: number;
}

export interface GhContributions {
  total: number;
  weeks: GhContributionWeek[];
}

export interface GhStats {
  profile: GhProfile | null;
  topRepos: GhRepo[];
  languages: GhLanguage[];
  totalStars: number;
  contributions: GhContributions | null;
}

// ─────────────────────────────────────────────────────────────────
// Fetchers
// ─────────────────────────────────────────────────────────────────

const safeFetch = async <T>(url: string, init?: RequestInit): Promise<T | null> => {
  try {
    const res = await fetch(url, { ...init, headers: { ...headers(), ...(init?.headers ?? {}) } });
    if (!res.ok) {
      console.warn(`[github] ${url} → ${res.status} ${res.statusText}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (e) {
    console.warn(`[github] ${url} → ${(e as Error).message}`);
    return null;
  }
};

export const getProfile = (): Promise<GhProfile | null> =>
  memo('profile', async () => {
    const u = username();
    if (!u) return null;
    type Raw = {
      login: string;
      name: string | null;
      public_repos: number;
      followers: number;
      created_at: string;
    };
    const raw = await safeFetch<Raw>(`${GH_REST}/users/${u}`);
    if (!raw) return null;
    return {
      login: raw.login,
      name: raw.name,
      publicRepos: raw.public_repos,
      followers: raw.followers,
      createdAt: raw.created_at,
    };
  });

export const getTopRepos = (limit = 6): Promise<GhRepo[]> =>
  memo(`topRepos:${limit}`, async () => {
    const u = username();
    if (!u) return [];
    type Raw = {
      name: string;
      full_name: string;
      description: string | null;
      html_url: string;
      language: string | null;
      stargazers_count: number;
      forks_count: number;
      pushed_at: string;
      fork: boolean;
      archived: boolean;
    };
    const raw =
      (await safeFetch<Raw[]>(
        `${GH_REST}/users/${u}/repos?sort=pushed&per_page=100`,
      )) ?? [];
    return raw
      .filter((r) => !r.fork && !r.archived)
      .map((r) => ({
        name: r.name,
        fullName: r.full_name,
        description: r.description,
        url: r.html_url,
        language: r.language,
        stars: r.stargazers_count,
        forks: r.forks_count,
        pushedAt: r.pushed_at,
        isFork: r.fork,
        isArchived: r.archived,
      }))
      .sort((a, b) => b.stars - a.stars || +new Date(b.pushedAt) - +new Date(a.pushedAt))
      .slice(0, limit);
  });

export const getLanguages = (sampleRepos = 12): Promise<GhLanguage[]> =>
  memo(`languages:${sampleRepos}`, async () => {
    const u = username();
    if (!u) return [];
    type Raw = {
      name: string;
      languages_url: string;
      fork: boolean;
      archived: boolean;
      pushed_at: string;
      stargazers_count: number;
    };
    const repos =
      (await safeFetch<Raw[]>(
        `${GH_REST}/users/${u}/repos?sort=pushed&per_page=100`,
      )) ?? [];
    const sample = repos
      .filter((r) => !r.fork && !r.archived)
      .sort(
        (a, b) =>
          b.stargazers_count - a.stargazers_count ||
          +new Date(b.pushed_at) - +new Date(a.pushed_at),
      )
      .slice(0, sampleRepos);

    const totals = new Map<string, number>();
    for (const r of sample) {
      const langs = await safeFetch<Record<string, number>>(r.languages_url);
      if (!langs) continue;
      for (const [lang, bytes] of Object.entries(langs)) {
        totals.set(lang, (totals.get(lang) ?? 0) + bytes);
      }
    }

    const totalBytes = Array.from(totals.values()).reduce((a, b) => a + b, 0);
    if (totalBytes === 0) return [];

    return Array.from(totals.entries())
      .map(([name, bytes]) => ({ name, bytes, share: bytes / totalBytes }))
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, 6);
  });

export const getContributions = (): Promise<GhContributions | null> =>
  memo('contributions', async () => {
    const u = username();
    const t = token();
    if (!u || !t) return null;

    const query = `
      query($login: String!) {
        user(login: $login) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                }
              }
            }
          }
        }
      }
    `;

    type Raw = {
      data?: {
        user?: {
          contributionsCollection?: {
            contributionCalendar?: {
              totalContributions: number;
              weeks: Array<{ contributionDays: Array<{ contributionCount: number }> }>;
            };
          };
        };
      };
    };

    const json = await safeFetch<Raw>(GH_GQL, {
      method: 'POST',
      body: JSON.stringify({ query, variables: { login: u } }),
      headers: { 'Content-Type': 'application/json' },
    });

    const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!cal) return null;

    return {
      total: cal.totalContributions,
      weeks: cal.weeks.map((w) => ({
        total: w.contributionDays.reduce((s, d) => s + d.contributionCount, 0),
      })),
    };
  });

export const getStats = async (): Promise<GhStats> => {
  const [profile, topRepos, languages, contributions] = await Promise.all([
    getProfile(),
    getTopRepos(6),
    getLanguages(12),
    getContributions(),
  ]);
  const totalStars = topRepos.reduce((s, r) => s + r.stars, 0);
  return { profile, topRepos, languages, totalStars, contributions };
};
