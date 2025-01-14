/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'spin-fast': 'spin 2s linear infinite',
        'spin-slow': 'spin 1.5s linear infinite',
        'spin-slow2': 'spin 2s ease-in-out infinite',
      },
      colors: {
        brand: '#2A8E9E',
        background: '#EFF2F6',
        foreground: 'var(--foreground)',
      },
      keyframes: {
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
      },
    },
  },
  plugins: [],
};
