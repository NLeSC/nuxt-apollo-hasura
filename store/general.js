export const state = () => ({
  selectedTab: 0,
})
export const mutations = {
  SELECTED_TAB(state, payload) {
    state.selectedTab = payload || 0
  },
}
