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
    mongodbUrl: process.env.MONGODB_URL,
  },
  vuefire: {
    auth: {
      enabled: true
    },
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    },
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
