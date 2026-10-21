/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // ── CSS-var-backed colour tokens ───────────────────────────────
      // These let you write  bg-theme-bg, text-theme-muted, etc. in JSX
      // while the actual value is driven by the active CSS theme token.
      colors: {
        // Static brand colours (same across all themes)
        primary: "#2563EB",

        // Legacy dark theme palette (kept for any remaining dark: utilities)
        dark: "#000000",
        darkCard: "#0d0d0d",
        darkBorder: "#1a1a1a",
        textLight: "#888888",

        // Legacy light theme palette
        light: "#fafafa",
        lightCard: "#ffffff",
        lightText: "#0a0a0a",
        lightMuted: "#555555",
        lightBorder: "#e5e5e5",

        // ── Dynamic theme tokens (reference CSS vars) ──────────────
        // Usage: bg-t-bg, text-t-muted, border-t-border, etc.
        't-bg': 'var(--t-bg)',
        't-card': 'var(--t-card)',
        't-border': 'var(--t-border)',
        't-border-hi': 'var(--t-border-hi)',
        't-text': 'var(--t-text)',
        't-muted': 'var(--t-text-muted)',
        't-faint': 'var(--t-text-faint)',
        't-primary': 'var(--t-primary)',
        't-heading': 'var(--t-heading)',
      },

      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Space Grotesk", "DM Sans", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },

      fontSize: {
        'hero-lg': 'clamp(3.5rem, 10vw, 8rem)',
        'hero-sm': 'clamp(1.1rem, 2.5vw, 1.5rem)',
      },

      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },

      backdropBlur: {
        xs: '4px',
      },

      boxShadow: {
        'glow-primary': '0 0 32px rgba(37,99,235,0.40)',
        'glow-sm': '0 0 16px rgba(37,99,235,0.28)',
      },
    },
  },
  plugins: [],
}
