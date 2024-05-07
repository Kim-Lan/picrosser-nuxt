import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'nuxt-icon',
    '@vueuse/nuxt',
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-vuefire',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  // hooks: {
  //   'pages:extend' (routes) {
  //     routes.push({
  //       path: '/play/:height(\\d+)x:width(\\d+)/:id?',
  //       file: resolve(__dirname, 'pages/play.vue')
  //     })
  //   }
  // },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  eslint: {

  },
  build: {
    transpile: ['vuetify'],
  },
  buildModules: ['@nuxtjs/html-validator'],
  runtimeConfig: {
    mongodbUrl: process.env.MONGODB_URI,
  },
  nitro: {
    // plugins: ['~/server/database.ts']
  },
  ssr: false,
  colorMode: {
    classSuffix: ''
  },
  css: ['~/assets/styles/main.css',
    '~/assets/styles/variables.scss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  imports: {
    dirs: ['server/utils', 'utils']
  }
})
