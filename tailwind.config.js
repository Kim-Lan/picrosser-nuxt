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
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      mono: ['Chivo Mono', 'monospace']
    }
  },
  // daisyui: {
  //   themes: [
  //     {
  //       cupcake: {
  //         ...require('daisyui/src/theming/themes')['[data-theme=cupcake]'],
  //         neutral: "#1f2937"
  //       }
  //     },
  //     'night'
  //   ]
  // },
  darkMode: 'class'
};
