import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'nuxt-icon',
    '@vueuse/nuxt',
    '@nuxt/eslint',
    ['@pinia/nuxt', {
      autoImports: ['defineStore', 'acceptHMRUpdate']
    }],
    '@pinia-plugin-persistedstate/nuxt',
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
    mongoUrl: process.env.MONGODB_URL,
  },
  nitro: {
    // plugins: ['~/server/database.ts']
  },
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
    dirs: ['stores', 'server/utils', 'utils']
  }
})
