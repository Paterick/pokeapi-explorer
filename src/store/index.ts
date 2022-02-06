import { createStore } from 'vuex'
import { Pokemon  } from 'pokenode-ts';

const store = createStore({
  state: {
    favorites: []
  },
  mutations: {
    addFavorite(state: any, payload: Pokemon) {
      const index = state.favorites.findIndex((x:Pokemon) => { return x.id === payload.id });

      if( index === -1) {
        state.favorites.push(payload);
      }
    },
    removeFavorite(state: any, payload: number) {
      state.favorites = state.favorites.filter((x:Pokemon) => { return x.id !== payload} );
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store
