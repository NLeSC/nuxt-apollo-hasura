/* eslint-disable prettier/prettier */
export const state = () => {
    return {
        selectedVideo: {}
    }
}
export const mutations = {
    SELECT_VIDEO(state, payload) {
        state.selectedVideo = payload || {}
    },
}
export const actions = {
    selectVideo(context, video) {
        context.commit("SELECT_VIDEO", video)
    }
}
