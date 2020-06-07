import colors from 'vuetify/es5/util/colors'

// Check if we need to run Nuxt in development mode
const isDev = process.env.NODE_ENV !== 'production'
const DB_URL = 'nuxt-apollo-hasura.herokuapp.com'

/* nuxt.config.js */
// only add `router.base = '/<repository-name>/'` if `DEPLOY_ENV` is `GH_PAGES`
const routerBase =
  process.env.DEPLOY_ENV === 'GH_PAGES'
    ? {
        base: '/nuxt-apollo-hasura/',
      }
    : {}

export default {
  env: {
    dbUrl: isDev ? 'http://localhost:4000' : `https://${DB_URL}`,
    baseUriHasura: isDev
      ? 'http://localhost:4000/v1/graphql'
      : `https://${DB_URL}`,
    baseWsHasura: isDev ? 'ws://localhost:4000/v1/graphql' : `wss://${DB_URL}`,
  },
  mode: 'spa', // "spa" | "universal"
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
  modules: ['@nuxtjs/pwa', '@nuxtjs/apollo', '@nuxtjs/auth', '@nuxtjs/axios'],

  router: {
    ...routerBase,
  },

  /**
   * Auth
   */
  auth: {
    redirect: {
      callback: '/callback',
    },

    strategies: {
      local: false,
      auth0: {
        domain:
          process.env.PRODUCTION_AUTH0_DOMAIN ||
          'nuxt-apollo-hasura.eu.auth0.com',
        client_id:
          process.env.PRODUCTION_AUTH0_CLIENT_ID ||
          'apEl6H8zjzPD6PhARUCUaPaFukByIQ07',
        audience: 'custom_auth0_api_audience',
      },
    },
  },

  /**
   * Apollo
   */
  apollo: {
    cookieAttributes: {
      expires: 7, // optional, default: 7 (days)
    },
    includeNodeModules: true, // optional, default: false (this includes graphql-tag for node_modules folder)
    authenticationType: 'Bearer', // optional, default: 'Bearer'
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
          primary: colors.green.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
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
