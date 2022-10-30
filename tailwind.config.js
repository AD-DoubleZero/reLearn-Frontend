/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      body: 'var(--tg-theme-bg-color)',
      button: 'var(--tg-theme-button-color)',
      buttonText: 'var(--tg-theme-button-text-color)',
      text: 'var(--tg-theme-text-color)',
      panel: 'var(--tg-theme-bg-color)',
      link: 'var(--tg-theme-link-color)',
      hint: 'var(var(--tg-theme-hint-color))',
      secondary: "#676e74"
    },
    extend: {
      fontFamily: {
        'sans': ['Roboto', 'Helvetica', 'Arial', 'sans-serif']
      }
    },
  },
  plugins: [],
}
