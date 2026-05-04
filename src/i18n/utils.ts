import { ui, defaultLang, type Lang, type UIKey } from './ui';

export const isLang = (v: string | undefined): v is Lang =>
  !!v && (v in ui);

/**
 * Resolve the active language from a URL pathname.
 * /es/...   → 'es'
 * /...      → 'en' (default)
 */
export const getLangFromUrl = (url: URL): Lang => {
  const [, first] = url.pathname.split('/');
  return isLang(first) ? first : defaultLang;
};

/**
 * Returns a t(key) function bound to the given language, with optional
 * `{token}` interpolation.
 */
export const useTranslations = (lang: Lang) => {
  return (key: UIKey, vars?: Record<string, string | number>): string => {
    const raw = (ui[lang][key] ?? ui[defaultLang][key] ?? key) as string;
    if (!vars) return raw;
    return Object.entries(vars).reduce(
      (out, [k, v]) => out.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v)),
      raw,
    );
  };
};

/**
 * Build a localized path. localizePath('/about/', 'es') → '/es/about/'.
 * The default locale lives at root.
 */
export const localizePath = (path: string, lang: Lang): string => {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === defaultLang) return clean;
  if (clean === '/') return `/${lang}/`;
  return `/${lang}${clean}`;
};

/**
 * Strip the locale prefix from a path. /es/about/ → /about/
 */
export const stripLocale = (path: string): string => {
  const segments = path.split('/');
  if (segments[1] && isLang(segments[1])) {
    segments.splice(1, 1);
  }
  const rest = segments.join('/');
  return rest === '' ? '/' : rest;
};

/**
 * Date formatter localized by language.
 */
export const formatDate = (
  date: Date,
  lang: Lang,
  opts: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' },
): string => {
  const locale = lang === 'es' ? 'es-ES' : 'en-US';
  return date.toLocaleDateString(locale, opts);
};

export { defaultLang };
export type { Lang, UIKey };
