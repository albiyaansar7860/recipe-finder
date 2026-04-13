/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10b981',
          hover: '#059669',
        },
        secondary: '#f59e0b',
        'bg-main': '#f8fafc',
        'bg-card': '#ffffff',
        'text-main': '#0f172a',
        'text-muted': '#64748b',
        border: '#e2e8f0',
      },
      boxShadow: {
        'premium': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
      },
    },
  },
  plugins: [],
}


