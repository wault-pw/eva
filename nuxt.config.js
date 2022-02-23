const VERSION = process.env.VERSION || '0.0.0'
const ALICE_URL = process.env.ALICE_URL || 'http://localhost:8080'

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

  css: [],

  publicRuntimeConfig: {
    spa: false,
    mpa: true,
    version: VERSION,
    axios: {
      browserBaseURL: ALICE_URL
    },
  },

  plugins: [
    '@/plugins/setup',
    '@/plugins/ver',
    '@/plugins/adapter'
  ],

  buildModules: [
    '@nuxt/typescript-build',
  ],

  modules: [
    '@nuxtjs/axios',
  ],

  axios: {
    credentials: true,
    debug: false,
    progress: false
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
