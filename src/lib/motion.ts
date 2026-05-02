import anime from 'animejs/lib/anime.es.js';

export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const settle = (els: Element[]) => {
  els.forEach((el) => {
    (el as HTMLElement).style.opacity = '1';
    (el as HTMLElement).style.transform = 'none';
  });
};

export interface RevealOptions {
  delay?: number;
  stagger?: number;
  duration?: number;
  translateY?: number;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Reveals matching elements when they intersect the viewport.
 * Falls back to immediate final state if the user prefers reduced motion.
 */
export const revealOnScroll = (
  selector: string | Element[],
  opts: RevealOptions = {},
): void => {
  const {
    delay = 0,
    stagger = 80,
    duration = 700,
    translateY = 16,
    threshold = 0.15,
    rootMargin = '0px 0px -8% 0px',
    once = true,
  } = opts;

  const targets =
    typeof selector === 'string'
      ? Array.from(document.querySelectorAll(selector))
      : selector;

  if (!targets.length) return;

  if (prefersReducedMotion()) {
    settle(targets);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const group = entry.target as HTMLElement;
        const children =
          group.dataset.revealChildren === 'true'
            ? Array.from(group.children)
            : [group];

        anime({
          targets: children,
          opacity: [0, 1],
          translateY: [translateY, 0],
          easing: 'cubicBezier(.22,1,.36,1)',
          duration,
          delay: anime.stagger(stagger, { start: delay }),
        });

        if (once) observer.unobserve(entry.target);
      });
    },
    { threshold, rootMargin },
  );

  targets.forEach((el) => observer.observe(el));
};

/**
 * Hero entry animation: eyebrow → headline → sub → tags → cta.
 */
export const playHeroReveal = (): void => {
  if (prefersReducedMotion()) {
    settle(Array.from(document.querySelectorAll('[data-hero-reveal]')));
    return;
  }
  const tl = anime.timeline({
    easing: 'cubicBezier(.22,1,.36,1)',
    duration: 800,
  });
  tl.add({
    targets: '[data-hero-reveal="eyebrow"]',
    opacity: [0, 1],
    translateY: [8, 0],
    duration: 600,
  })
    .add(
      {
        targets: '[data-hero-reveal="title"] .word',
        opacity: [0, 1],
        translateY: [18, 0],
        delay: anime.stagger(70),
      },
      '-=400',
    )
    .add(
      {
        targets: '[data-hero-reveal="sub"]',
        opacity: [0, 1],
        translateY: [12, 0],
      },
      '-=550',
    )
    .add(
      {
        targets: '[data-hero-reveal="tags"] [data-tag]',
        opacity: [0, 1],
        translateY: [8, 0],
        delay: anime.stagger(55),
        duration: 550,
      },
      '-=500',
    )
    .add(
      {
        targets: '[data-hero-reveal="cta"]',
        opacity: [0, 1],
        translateY: [10, 0],
      },
      '-=550',
    );
};

/**
 * Stagger reveal on a tag list (when scrolled into view).
 */
export const revealTags = (selector: string): void => {
  const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
  if (!els.length) return;
  if (prefersReducedMotion()) {
    settle(els);
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const group = entry.target as HTMLElement;
        const tags = group.querySelectorAll('[data-tag]');
        anime({
          targets: tags,
          opacity: [0, 1],
          translateY: [8, 0],
          easing: 'cubicBezier(.22,1,.36,1)',
          duration: 500,
          delay: anime.stagger(50),
        });
        observer.unobserve(group);
      });
    },
    { threshold: 0.25 },
  );
  els.forEach((el) => observer.observe(el));
};

/**
 * Animate SVG paths drawing themselves (architecture flow lines).
 */
export const drawPaths = (selector: string): void => {
  const containers = Array.from(document.querySelectorAll(selector));
  if (!containers.length) return;

  if (prefersReducedMotion()) {
    containers.forEach((c) => {
      c.querySelectorAll<SVGPathElement>('path[data-draw]').forEach((p) => {
        p.style.strokeDasharray = '';
        p.style.strokeDashoffset = '0';
        p.style.opacity = '1';
      });
      c.querySelectorAll<SVGElement>('[data-node]').forEach((n) => {
        n.style.opacity = '1';
      });
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const root = entry.target as HTMLElement;
        const paths = root.querySelectorAll<SVGPathElement>('path[data-draw]');
        paths.forEach((p) => {
          const len = p.getTotalLength();
          p.style.strokeDasharray = `${len}`;
          p.style.strokeDashoffset = `${len}`;
          p.style.opacity = '1';
        });
        anime({
          targets: paths,
          strokeDashoffset: [anime.setDashoffset, 0],
          easing: 'easeInOutCubic',
          duration: 1200,
          delay: anime.stagger(180),
        });
        anime({
          targets: root.querySelectorAll('[data-node]'),
          opacity: [0, 1],
          scale: [0.6, 1],
          easing: 'cubicBezier(.22,1,.36,1)',
          duration: 600,
          delay: anime.stagger(140, { start: 200 }),
        });
        observer.unobserve(root);
      });
    },
    { threshold: 0.35 },
  );
  containers.forEach((c) => observer.observe(c));
};

/**
 * Continuous architecture grid pulsing — random nodes pulse in slow rhythm.
 */
export const startArchitectureGrid = (selector: string): void => {
  if (prefersReducedMotion()) return;
  const root = document.querySelector(selector);
  if (!root) return;
  const nodes = Array.from(root.querySelectorAll('[data-pulse]'));
  if (!nodes.length) return;

  const pulseRandom = () => {
    const pick = nodes[Math.floor(Math.random() * nodes.length)];
    anime({
      targets: pick,
      opacity: [
        { value: 0.85, duration: 600 },
        { value: 0.18, duration: 1400 },
      ],
      scale: [
        { value: 1.4, duration: 600 },
        { value: 1, duration: 1400 },
      ],
      easing: 'cubicBezier(.22,1,.36,1)',
    });
  };

  setInterval(pulseRandom, 900);
  // burst on init so we don't wait
  pulseRandom();
};

/**
 * Count-up for impact metrics.
 */
export const countUp = (selector: string): void => {
  const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
  if (!els.length) return;
  if (prefersReducedMotion()) {
    els.forEach((el) => {
      const final = el.dataset.countTo ?? el.textContent ?? '';
      el.textContent = final;
    });
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const to = Number(el.dataset.countTo ?? '0');
        const suffix = el.dataset.countSuffix ?? '';
        const obj = { v: 0 };
        anime({
          targets: obj,
          v: to,
          round: 1,
          easing: 'easeOutCubic',
          duration: 1200,
          update: () => {
            el.textContent = `${obj.v}${suffix}`;
          },
        });
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 },
  );
  els.forEach((el) => observer.observe(el));
};
