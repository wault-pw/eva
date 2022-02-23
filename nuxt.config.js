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
    srp: "SRP_1024"
  },

  plugins: [
    '@/plugins/setup'
  ],

  buildModules: [
    '@nuxt/typescript-build',
  ],

  modules: [
    '@nuxtjs/axios',
  ],

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
