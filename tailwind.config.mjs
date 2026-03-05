/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        cafered: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fca5a5',
          300: '#f87171',
          400: '#ef4444',
          500: '#be0000',
          600: '#a50000',
          700: '#8b0000',
          800: '#6d0000',
          900: '#520000',
          950: '#2d0000',
        },
      },
    },
  },
  plugins: [],
};
