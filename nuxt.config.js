const uri = 'https://taito-hasegawa.com'
require('dotenv').config()

export default {
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'work-id',
        path: '/work/:id',
        component: resolve(__dirname, 'pages/_id/index.vue'),
        chunkName: 'pages/work-id'
      });
      routes.push({
        name: 'diary-id',
        path: '/diary/:id',
        component: resolve(__dirname, 'pages/_id/index.vue'),
        chunkName: 'pages/diary-id'
      });
    },
    scrollBehavior(to, from, savedPosition) {
      // スクロール位置を常にトップにリセット
      return { x: 0, y: 0 }
    }
  },
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  generate: {
    fallback: true,
    async routes() {
      // ここで静的生成するページを取得して返す
      // microCMSからデータを取得して動的にページを生成する場合はここにロジックを追加
      console.log('Generating static routes...')
      const axios = require('axios')
      const serviceDomain = process.env.SERVICE_DOMAIN
      const apiKey = process.env.API_KEY
      const config = {
        headers: { 'X-API-KEY': apiKey }
      }

      try {
        const worksResponse = await axios.get(`https://${serviceDomain}.microcms.io/api/v1/work`, config)
        const works = worksResponse.data.contents
        console.log('Works:', works)
        const routes = works.map(work => `/work/${work.id}`)
        console.log('Generated routes:', routes)
        return routes
      } catch (error) {
        console.error('Failed to fetch works:', error)
        return []
      }
    }
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'TAITO HASEGAWA',
    htmlAttrs: {
      lang: 'ja',
      prefix: 'og: http://ogp.me/ns#'
    },
    titleTemplate: '%s - TAITO HASEGAWA',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'TAITO HASEGAWA. Product Designer. じぶんと、みんなを、没頭させる道具と仕組みをつくります。' },
      { hid: 'keywords', name: 'keywords', content: 'taitohasegawa,長谷川泰斗,taito,hasegawa,長谷川,泰斗,design,product,デザイン,プロダクト' },

      { hid: 'og:site_name', property: 'og:site_name', content: 'TAITO HASEGAWA WORKS' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:locale', property: 'og:locale', content: 'ja_JP' },
      { hid: 'og:url', property: 'og:url', content: 'https://taito-hasegawa.com/' },
      { hid: 'og:title', property: 'og:title', content: 'TAITO HASEGAWA' },
      { hid: 'og:description', property: 'og:description', content: 'TAITO HASEGAWA WORKS' },
      { hid: 'og:image', property: 'og:image', content: uri + '/OGP-taitohasegawa.png' },

      { hid: 'fb:app_id', property: 'fb:app_id', content: 'App-ID' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@taito_hasegawa' },

      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', sizes: "16x16", href: '/favicon.ico' },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/style/reset.css',
    '~/assets/style/global.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/adobe-fonts',
    '~/plugins/microcms'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    'nuxt-microcms-module',
    '@nuxtjs/google-gtag',
    '@nuxt/image'
  ],
  image: {
    domains: ['images.microcms-assets.io'],  // microCMSの画像ホストを追加
    screens: {
      xs: 320,
      md: 800,
      lg: 1280,
    }
  },
  microcms: {
    options: {
      serviceDomain: process.env.SERVICE_DOMAIN,
      apiKey: process.env.API_KEY,
    },
    mode: process.env.NODE_ENV === 'production' ? 'server' : 'all',
  },
  'google-gtag': {
    id: 'G-EX0Q3V9TLM',
    debug: true
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/dotenv',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
}