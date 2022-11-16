const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue"
  ],
  plugins: [
    require('daisyui')
  ],
  theme: {
    fontFamily: {
      sans: ['Ubuntu', 'Open Sans', 'sans-serif']
    }
  },
  daisyui: {
    themes: [
      'cmyk',
      'night',
      {
        cupcake: {
          ...require('daisyui/src/colors/themes')['[data-theme=cupcake]'],
          neutral: "#1f2937"
        }
      }
    ]
  },
  darkMode: 'class'
}
