export const state = () => ({
  featureNames: [],
  selectedFeatures: [
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
  getActiveFeatures: (state) => {
    return state.featureNames
      .map((field) => {
        return {
          label: field.name,
          active: state.selectedFeatures.includes(field.name),
          description: field.description,
        }
      })
      .filter((filed) => filed.active)
      .filter((filed) => {
        return filed.label !== 'grouped_seconds' && filed.label !== 'min_timestamp'
      })
  },
}

export const mutations = {
  UPDATE_FEATURES_NAME(state, payload) {
    state.featureNames = payload
  },
  UPDATE_SELECTED_FEATURES(state, payload) {
    state.selectedFeatures = payload
  },
}
