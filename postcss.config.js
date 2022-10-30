module.exports = {
  plugins: {
    tailwindcss: {
      cssPath: 'src/index.css',
      configPath: 'tailwind.config.js',
    },
    autoprefixer: {},
    // ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  },
}
