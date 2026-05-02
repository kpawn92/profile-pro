/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0B',
        surface: '#131317',
        'surface-2': '#1A1A1F',
        border: {
          DEFAULT: '#25252C',
          strong: '#35353E',
        },
        text: {
          DEFAULT: '#ECEDEE',
          muted: '#9295A0',
          dim: '#5E6068',
        },
        accent: {
          DEFAULT: '#C9A86A',
          soft: 'rgba(201, 168, 106, 0.10)',
          line: 'rgba(201, 168, 106, 0.35)',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'monospace',
        ],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 6.5vw, 5.5rem)', { lineHeight: '1.04', letterSpacing: '-0.025em' }],
        'display-l': ['clamp(2.25rem, 4vw, 3.5rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'display-m': ['clamp(1.6rem, 2.6vw, 2.25rem)', { lineHeight: '1.18', letterSpacing: '-0.015em' }],
        eyebrow: ['0.75rem', { lineHeight: '1', letterSpacing: '0.18em' }],
      },
      maxWidth: {
        container: '1200px',
        prose: '680px',
      },
      spacing: {
        section: '6rem',
        'section-sm': '3.5rem',
      },
      transitionTimingFunction: {
        precise: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      typography: ({ theme }) => ({
        invert: {
          css: {
            '--tw-prose-body': theme('colors.text.DEFAULT'),
            '--tw-prose-headings': theme('colors.text.DEFAULT'),
            '--tw-prose-lead': theme('colors.text.muted'),
            '--tw-prose-links': theme('colors.accent.DEFAULT'),
            '--tw-prose-bold': theme('colors.text.DEFAULT'),
            '--tw-prose-counters': theme('colors.text.dim'),
            '--tw-prose-bullets': theme('colors.text.dim'),
            '--tw-prose-hr': theme('colors.border.DEFAULT'),
            '--tw-prose-quotes': theme('colors.text.DEFAULT'),
            '--tw-prose-quote-borders': theme('colors.accent.DEFAULT'),
            '--tw-prose-captions': theme('colors.text.muted'),
            '--tw-prose-code': theme('colors.text.DEFAULT'),
            '--tw-prose-pre-code': theme('colors.text.DEFAULT'),
            '--tw-prose-pre-bg': theme('colors.surface.DEFAULT'),
            '--tw-prose-th-borders': theme('colors.border.DEFAULT'),
            '--tw-prose-td-borders': theme('colors.border.DEFAULT'),
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
