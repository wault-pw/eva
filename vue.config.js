const VERSION = process.env.VERSION || '0.1'
const ALICE_URL = process.env.ALICE_URL || 'http://localhost:8080'
const DEMO_USERNAME = process.env.DEMO_USERNAME || 'demo'
const DEMO_PASSWORD = process.env.DEMO_PASSWORD || 'demo'
const LOCALE = process.env.LOCALE || 'en'
const VER666 = !!process.env.VER666

const STATUS_PAGE = process.env.STATUS_PAGE || 'http://example.com'
const TERMS_PAGE = process.env.TERMS_PAGE || 'http://example.com'
const PRIVACY_PAGE = process.env.PRIVACY_PAGE || 'http://example.com'
const FEATURE_PAGE = process.env.FEATURE_PAGE || 'http://example.com'
const SECURITY_PAGE = process.env.SECURITY_PAGE || 'http://example.com'
const EMAIL = process.env.EMAIL || 'support@example.com'
const GITHUB = 'https://github.com/wault-pw/eva'

module.exports = {
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = "Wault Cloud"

      args[0].__setup__ = {
        spa: false,
        mpa: true,
        version: VERSION,
        github: GITHUB,
        ver666: VER666,
        locale: LOCALE,
        email: EMAIL,
        demoUsername: DEMO_USERNAME,
        demoPassword: DEMO_PASSWORD,
        statusPage: STATUS_PAGE,
        termsPage: TERMS_PAGE,
        privacyPage: PRIVACY_PAGE,
        featurePage: FEATURE_PAGE,
        securityPage: SECURITY_PAGE,
        aliceUrl: ALICE_URL
      }

      return args
    })
  }
}
