export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Новогодняя игра блока Т',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
  },

  browserslist: [
    '>0.3%',
    'not ie 11',
    'not dead',
    'not op_mini all',
    'last 3 version',
    'Chrome >= 35',
    'Firefox >= 38',
    'Edge >= 10',
    'Explorer >= 10',
    'ie >= 10',
    'iOS >= 8',
    'Safari >= 8',
    'Android 2.3',
    'Android >= 4',
    'Opera >= 12',
  ],

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/main.less'],

  googleFonts: {
    base64: true,
    download: true,
    families: {
      Montserrat: {
        wght: [300, 400, 600],
      },
    },
    fontsPath: '~assets/fonts',
    inject: true,
  },

  gsap: {
    /* Module Options */
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: 'node_modules/nuxtjs-phaser', mode: 'client' },
    { src: '@/plugins/vClickOutside', ssr: false },
    '~/plugins/vue-final-modal.js',
    '~/components/global/init.js',
    // { src: '~/plugins/vue-grid-layout.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    path: '~/components',
    ignore: ['./global/*/**.{vue,js}'],
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    'nuxt-gsap-module',
    '@nuxtjs/google-fonts',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    'nuxt-svg-loader',
    '@nuxt/image',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: {
      ignoreOrder: false,
    },
    transpile: ['gsap', 'vue-final-modal'],
  },

  server: {
    // host: '0.0.0.0',
  },
}
