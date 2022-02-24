const VERSION = process.env.VERSION || '0.0.0'
const ALICE_URL = process.env.ALICE_URL || 'http://localhost:8080'
const DEMO_USERNAME = process.env.DEMO_USERNAME || 'demo'
const DEMO_PASSWORD = process.env.DEMO_PASSWORD || 'demo'

export default {
  components: true,
  ssr: false,
  target: 'static',

  head: {
    title: 'eva',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  css: [
    '~/assets/css/vendors.scss',
    '~/assets/css/skeleton.scss',
    '~/assets/css/components.scss',
  ],


  publicRuntimeConfig: {
    spa: false,
    mpa: true,
    version: VERSION,
    github: 'https://github.com/oka-is/eva',
    demoUsername: DEMO_USERNAME,
    demoPassword: DEMO_PASSWORD,
    axios: {
      browserBaseURL: ALICE_URL
    },
  },

  plugins: [
    '@/plugins/setup',
    '@/plugins/ver',
    '@/plugins/urn',
    '@/plugins/bus',
    '@/plugins/throbber',
    '@/plugins/adapter'
  ],

  buildModules: [
    '@nuxt/typescript-build',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
  ],

  axios: {
    credentials: true,
    debug: false,
    progress: false
  },

  i18n: {
    lazy: false,
    vueI18nLoader: false,
    locales: [
      {code: 'en', iso: 'en-US', file: 'en.js', dir: 'ltr'},
      {code: 'ru', iso: 'ru-RU', file: 'ru.js', dir: 'ltr'},
    ],
    strategy: 'prefix',
    langDir: 'locales/',
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n',
      redirectOn: 'root',
    }
  },

  router: {
    mode: 'hash',
    trailingSlash: false
  },

  build: {
    babel: {
      babelrc: true,
    },
    splitChunks: {
      pages: false,
      vendor: false,
      commons: false,
      runtime: false,
      layouts: false,
      name: false,
    },
    extend(config) {
      config.module.rules.push({
        test: /\.worker\.js$/,
        use: [{loader: 'worker-loader', options: {inline: 'no-fallback'}}],
        exclude: /(node_modules)/
      })
    }
  }
}
