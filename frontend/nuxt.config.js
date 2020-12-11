const colors = require('vuetify/es5/util/colors').default

// Check if we need to run Nuxt in development mode
const isDev = process.env.NODE_ENV !== 'production'
const DB_URL = 'production-base-url'
const DOCS_URL = 'production-base-url'

/* nuxt.config.js */
// only add `router.base = '/<repository-name>/'` if `DEPLOY_ENV` is `GH_PAGES`
const routerBase =
  process.env.DEPLOY_ENV === 'GH_PAGES' ? { base: '/nuxt-apollo-hasura/' } : {}

export default {
  // Auto import components with @nuxt/components
  components: true,

  //
  ssr: true,

  // Target: static

  // Nuxt telemetry questions
  telemetry: false,

  env: {
    dbUrl: isDev ? 'http://localhost:4000' : `https://${DB_URL}`,
    docsUrl: isDev ? 'http://localhost:2000' : `https://${DOCS_URL}`,
    baseUriHasura: isDev
      ? 'http://localhost:4000/v1/graphql'
      : `https://${DB_URL}`,
    baseWsHasura: isDev ? 'ws://localhost:4000/v1/graphql' : `wss://${DB_URL}`,
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#3872ff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/apollo',
    '@nuxtjs/auth',
    '@nuxtjs/axios',
    '@nuxt/components',
    '@nuxtjs/date-fns',
  ],

  router: {
    ...routerBase,
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    // baseURL: 'http://localhost:3000',
    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    // },
  },

  /**
   * Auth
   */
  auth: {
    plugins: [{ src: '~/plugins/axios', ssr: true }, '~/plugins/auth.js'],
    // resetOnError: true,
    // watchLoggedIn: false,
    redirect: {
      // login: '/login', // User will be redirected to this path if login is required.
      // home: '/', // User will be redirect to this path after login. (rewriteRedirects will rewrite this path)
      // logout: '/', // User will be redirected to this path if after logout, current route is protected.
      // user: '/profile',
      callback: '/callback', // User will be redirect to this path by the identity provider after login. (Should match configured Allowed Callback URLs (or similar setting) in your app/client with the identity provider)
    },
    strategies: {
      google: {
        client_id:
          '956336158440-r92a5pvq8597pi32fph1234n9m185pv7.apps.googleusercontent.com',
      },
      github: {
        client_id: 'cc9db191742f8c6a3b46',
        client_secret: '7694a2d53f8c7a9f3eefdc681a907b59837a503c',
      },
    },
  },

  /**
   * Apollo
   */
  apollo: {
    tokenName: 'apollo-token', // optional, default: apollo-token
    cookieAttributes: {
      expires: 7, // optional, default: 7 (days)
    },
    includeNodeModules: true, // optional, default: false (this includes graphql-tag for node_modules folder)
    authenticationType: 'Bearer', // optional, default: 'Bearer'
    // optional
    // watchLoading: '~/plugins/apollo-watch-loading-handler.js',
    // optional
    errorHandler: '~/plugins/apollo-error-handler.js',
    // required
    clientConfigs: {
      default: '~/apollo/clientConfig.js',
    },
  },

  /*
   ** Vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {
      icons: 'mdiSvg',
      font: '', // <- Needed to dont' load Roboto font fro the cdn
    },
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.blue.lighten1,
        },
        dark: {
          primary: colors.blue.lighten1,
        },
      },
    },
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},

    babel: {
      plugins: ['@babel/plugin-proposal-optional-chaining'],
      presets({ isServer }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            // require.resolve('@nuxt/babel-preset-app-edge'), // For nuxt-edge users
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: { version: 3 },
            },
          ],
        ]
      },
    },
  },

  pwa: {
    workbox: {
      // importScripts: ['/firebase-auth-sw.js'],
      // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
      // only set this true for testing and remember to always clear your browser cache in development
      // dev: process.env.NODE_ENV === 'development',
      debug: false,
    },
  },
}
