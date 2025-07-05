/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-lora)'],
      },
      colors: {
        'primary': {
          DEFAULT: '#0a4f54',
          dark: '#073a3d',
          lightest: '#f0f7f7',
        },
        'secondary': '#f3f3f3',
        'accent': {
          DEFAULT: '#d90d79',
          light: '#e85da7',
        },
        'text-main': '#1a1a1a',
        'text-light': '#5c5c5c',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}; 