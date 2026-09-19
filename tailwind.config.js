/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  // Class strategy: adding/removing 'dark' on <html> controls all dark: variants
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#6C63FF",      // purple accent — same in both themes

        // Dark theme
        dark: "#0F172A",         // dark background
        darkCard: "#1E293B",     // dark card background
        textLight: "#94A3B8",    // dark theme muted text

        // Light theme
        light: "#F8F7FF",        // slightly purple-tinted white background
        lightCard: "#FFFFFF",    // light card background
        lightText: "#1E1B4B",    // deep indigo-black for primary text
        lightMuted: "#4B5563",   // darker grey for better contrast on white
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
