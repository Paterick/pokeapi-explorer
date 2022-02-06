<template>
  <div class="home">
    <h2>{{title}}</h2>
    <form @submit.prevent="onFetchPokemon" class="search-form">
      <input class="pokemon-name" type="text" placeholder="Enter the name of pokeman to search for" v-model="name" >
      <button v-if="!isPending">Search</button>
      <button v-else>Searching...</button>
      <div class="error" v-if="error">{{error}}</div>
    </form>

    <PokemonCard :pokemon ="foundPokemon" v-if="foundPokemon" />
    <div class="actions" v-if="foundPokemon">
      <button @click="onAddToFavorites">Add to Favorites</button>
      <div class="add-result" v-if="addResult">{{addResult}}</div>
    </div>
  </div>
  
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import usePokemonApi from '@/composables/usePokemonApi';
import PokemonCard from '@/components/PokemonCard.vue';

export default defineComponent({
  name: 'Home',
  components: { PokemonCard },
  setup() {
    const store = useStore();
    
    const title = ref('Welcome to pokeapi explorer');
    const name = ref('');
    const addResult = ref('');
    const { foundPokemon, error, isPending, searchPokemonApi } = usePokemonApi();

    const onFetchPokemon = async() => {
      addResult.value = '';
      await searchPokemonApi(name.value);
    }

    const onAddToFavorites = () => {
      if( !foundPokemon.value) {
        return;
      }

      store.commit('addFavorite', foundPokemon.value);
      addResult.value = `Added ${foundPokemon.value.name} to favorites`
    }

    return { title, onFetchPokemon, name, foundPokemon, error, isPending, onAddToFavorites, addResult }
  }
});
</script>

<style>
  .pokemon-name {
    width: 20rem;
  }

  .search-form {
    max-width: 20rem;
  }
</style>
