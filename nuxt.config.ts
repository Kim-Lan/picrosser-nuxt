// https://v3.nuxtjs.org/api/configuration/nuxt.config
import { resolve } from 'pathe'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'nuxt-icon',
    '@vueuse/nuxt',
    ['@pinia/nuxt', {
      autoImports: ['defineStore', 'acceptHMRUpdate']
    }]
  ],
  buildModules: ['@nuxtjs/html-validator'],
  ssr: false,
  hooks: {
    'pages:extend' (routes) {
      routes.push({
        path: '/:width(\\d+)x:height(\\d+)/:id?',
        file: resolve(__dirname, 'pages/puzzle.vue')
      })
    }
  },
  colorMode: {
    classSuffix: ''
  },
  css: ['~/assets/styles/global.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  typescript: {
    strict: true
  },
  imports: {
    dirs: ['stores']
  }
})
