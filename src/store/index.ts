import { createStore } from 'vuex'

const store = createStore({
  state: {
    favorites: []
  },
  mutations: {
    addFavorite(state: any, payload: string) {
      state.favorites.push(payload);
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store
