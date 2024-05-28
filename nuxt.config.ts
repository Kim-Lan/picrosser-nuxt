import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@sidebase/nuxt-auth',
    '@nuxtjs/seo',
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
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    }
  },
  site: {
    url: 'https://picrosser.com',
    name: 'Picrosser',
    description: 'A website to play the puzzle game Picross, also known as nonograms, online in your browser.',
    defaultLocale: 'en',
  },
  sitemap: {
    urls: [
      '/play/5x5',
      '/play/10x10',
      '/play/15x15',
      '/play/20x20',
      '/play/25x25',
    ],
  },
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
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
})
