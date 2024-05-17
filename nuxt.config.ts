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
    '@sidebase/nuxt-auth',
    'nuxt-security',
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
  auth: {
    baseURL: process.env.AUTH_ORIGIN,
    provider: {
      type: 'authjs'
    }
  },
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
    authSecret: process.env.AUTH_SECRET,
    authEmailVerificationSecret: process.env.AUTH_EMAIL_VERIFICATION_SECRET,
    googleAppPassword: process.env.GOOGLE_APP_PASSWORD,
  },
  nitro: {
    plugins: ['~/server/database.ts']
  },
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
