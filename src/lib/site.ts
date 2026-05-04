export const site = {
  name: 'Alejandro Pozo',
  shortName: 'A. Pozo',
  email: 'hap921020@gmail.com',
  social: {
    github: 'https://github.com/',
    linkedin: 'https://linkedin.com/in/',
  },
  // GitHub username used for the open-source stats section.
  // Override in .env (GITHUB_USERNAME) — this is just the fallback for display.
  githubHandle: 'alejandropozo',
} as const;

export const specialization = [
  'ERP',
  'Accounting Systems',
  'Backend Architecture',
  'DDD',
  'Hexagonal Architecture',
  'Clean Architecture',
  'TDD',
] as const;

export const navigation = [
  { key: 'nav.work', href: '/case-studies/' },
  { key: 'nav.writing', href: '/writing/' },
  { key: 'nav.about', href: '/about/' },
  { key: 'nav.contact', href: '/contact/' },
] as const;
