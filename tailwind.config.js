const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  plugins: [
    require('daisyui')
  ],
  theme: {
    fontFamily: {
      sans: ['Ubuntu', 'sans-serif']
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
  }
}
