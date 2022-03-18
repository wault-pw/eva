const VERSION = process.env.VERSION || '0.1'
const ALICE_URL = process.env.ALICE_URL || 'http://localhost:8080'
const DEMO_USERNAME = process.env.DEMO_USERNAME || 'demo'
const DEMO_PASSWORD = process.env.DEMO_PASSWORD || 'demo'
const LOCALE = process.env.LOCALE || 'ru'
const VER666 = !!process.env.VER666

const STATUS_PAGE = process.env.STATUS_PAGE || 'http://example.com'
const TERMS_PAGE = process.env.TERMS_PAGE || 'http://example.com'
const PRIVACY_PAGE = process.env.PRIVACY_PAGE || 'http://example.com'
const ABOUT_PAGE = process.env.ABOUT_PAGE || 'http://example.com'
const EMAIL = process.env.EMAIL || 'support@example.com'

export default {
  components: true,
  ssr: false,
  target: 'static',

  head: {
    title: 'Wault',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'},
      {name: "msapplication-TileColor", content: "#ff9900"},
      {name: "theme-color", content: "#ff9900"},
      {name: "msapplication-TileImage", content: "/favicon-144.png"},
    ],
    link: [
      {rel: "shortcut icon", href: "/favicon.ico", type: "image/x-icon"},
      {rel: "apple-touch-icon", href: "/apple-touch-icon.png"},
      {rel: "apple-touch-icon", sizes: "57x57", href: "/apple-touch-icon-57x57.png"},
      {rel: "apple-touch-icon", sizes: "72x72", href: "/apple-touch-icon-72x72.png"},
      {rel: "apple-touch-icon", sizes: "76x76", href: "/apple-touch-icon-76x76.png"},
      {rel: "apple-touch-icon", sizes: "114x114", href: "/apple-touch-icon-114x114.png"},
      {rel: "apple-touch-icon", sizes: "120x120", href: "/apple-touch-icon-120x120.png"},
      {rel: "apple-touch-icon", sizes: "144x144", href: "/apple-touch-icon-144x144.png"},
      {rel: "apple-touch-icon", sizes: "152x152", href: "/apple-touch-icon-152x152.png"},
      {rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon-180x180.png"},
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
    github: 'https://github.com/wault-pw/eva',
    ver666: VER666,
    locale: LOCALE,
    email: EMAIL,
    demoUsername: DEMO_USERNAME,
    demoPassword: DEMO_PASSWORD,
    statusPage: STATUS_PAGE,
    termsPage: TERMS_PAGE,
    privacyPage: PRIVACY_PAGE,
    aboutPage: ABOUT_PAGE,
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
    '@/plugins/dialog',
    '@/plugins/adapter',
    '@/plugins/locale',
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
    strategy: 'no_prefix',
    langDir: 'locales/',
    defaultLocale: 'ru',
    useCookie: false,
    differentDomains: false,
  },

  router: {
    mode: 'hash',
    trailingSlash: false
  },

  server: {
    host: '0.0.0.0'
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
