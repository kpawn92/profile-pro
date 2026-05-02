export const site = {
  name: 'Alejandro Pozo',
  shortName: 'A. Pozo',
  role: 'Senior Full-Stack Developer for Complex Business Systems',
  description:
    'I design robust backend architectures and full-stack solutions for ERP, accounting, inventory, sales and financial operation workflows.',
  email: 'hap921020@gmail.com',
  location: 'Remote · EU timezone',
  availability: 'Selectively taking on engagements for 2026',
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
  { label: 'Work', href: '/case-studies/' },
  { label: 'Writing', href: '/writing/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
] as const;
