import get_feature_names from '~/apollo/get_feature_names'

export const state = () => ({
  featureNames: [],
  defaultEnabledFeatures: [
    'success',
    'topic',
    'silence',
    'pitch',
    'intensity',
    'au01r',
    'au01c',
    'au04r',
    'au04c',
    'au09r',
    'au09c',
    'au10r',
    'au10c',
    'au12r',
    'au12c',
    'au14r',
    'au14c',
    'au15r',
    'au15c',
  ],
})
export const getters = {
  selected_features: (state) => {
    return state.enabledFeatures.filter((filed) => filed.active)
  },
}

export const actions = {
  async getFeatures({ state, commit }) {
    const response = await this.app.apolloProvider.defaultClient.query({
      query: get_feature_names,
      result({ data, loading, networkStatus }) {
        const feature_names = data?.get_feature_names.fields
          .map((field) => ({
            label: field.name,
            active: state.defaultEnabledFeatures.includes(field.name),
            description: field.description,
          }))
          .filter((filed) => filed.label !== 'grouped_seconds' && filed.label !== 'min_timestamp')

        commit('UPDATE_FEATURES_NAME', feature_names)
      },
      error(error) {
        this.error = JSON.stringify(error.message)
      },
    })

    return response
  },
}

export const mutations = {
  UPDATE_FEATURES_NAME(state, payload) {
    state.featureNames = payload
  },
}
