const VERSION = process.env.VERSION || '0.0.0'
const ALICE_URL = process.env.ALICE_URL || 'http://localhost:8080'
const DEMO_USERNAME = process.env.DEMO_USERNAME || 'demo'
const DEMO_PASSWORD = process.env.DEMO_PASSWORD || 'demo'
const STATUS_PAGE = process.env.STATUS_PAGE || 'http://example.com' // https://stats.uptimerobot.com/mwKV7ipG7A
const VER666 = !!process.env.VER666

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
      {name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'},
      {name: "msapplication-TileColor", content: "#ff9900"},
      {name: "theme-color", content: "#ff9900"},
      {name: "msapplication-TileImage", content: "/favicon-144.png"},
    ],
    link: [
      {rel: "shortcut icon", href: "/favicon.ico"},
      {rel: "icon", sizes: "16x16 32x32 64x64", href: "/favicon.ico"},
      {rel: "icon", type: "image/png", sizes: "196x196", href: "/favicon-192.png"},
      {rel: "icon", type: "image/png", sizes: "160x160", href: "/favicon-160.png"},
      {rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon-96.png"},
      {rel: "icon", type: "image/png", sizes: "64x64", href: "/favicon-64.png"},
      {rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png"},
      {rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16.png"},
      {rel: "apple-touch-icon", href: "/favicon-57.png"},
      {rel: "apple-touch-icon", sizes: "114x114", href: "/favicon-114.png"},
      {rel: "apple-touch-icon", sizes: "72x72", href: "/favicon-72.png"},
      {rel: "apple-touch-icon", sizes: "144x144", href: "/favicon-144.png"},
      {rel: "apple-touch-icon", sizes: "60x60", href: "/favicon-60.png"},
      {rel: "apple-touch-icon", sizes: "120x120", href: "/favicon-120.png"},
      {rel: "apple-touch-icon", sizes: "76x76", href: "/favicon-76.png"},
      {rel: "apple-touch-icon", sizes: "152x152", href: "/favicon-152.png"},
      {rel: "apple-touch-icon", sizes: "180x180", href: "/favicon-180.png"},
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
    ver666: VER666,
    demoUsername: DEMO_USERNAME,
    demoPassword: DEMO_PASSWORD,
    statusPage: STATUS_PAGE,
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
