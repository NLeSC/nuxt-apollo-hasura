export const state = () => ({
  position: 0,
  seeking: false,
})
export const mutations = {
  UPDATE_CURSOR_POSITION(state, payload) {
    state.position = Math.floor(payload) || 0
  },

  SEEKING(state, payload) {
    state.seeking = payload || false
  },
}
