<template>
  <div class="home">
    <h2>{{title}}</h2>
    <form @submit.prevent="onFetchPokemon" class="search-form">
      <input class="pokemon-name" type="text" placeholder="Enter the name of pokeman to search for" v-model="name" >
      <button v-if="!isPending">Search</button>
      <button v-else>Searching...</button>
      <div class="error" v-if="error">{{error}}</div>
    </form>

  </div>
  <PokemonCard :pokemon ="foundPokemon" v-if="foundPokemon" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import usePokemonApi from '@/composables/usePokemonApi.ts';
import PokemonCard from '@/components/PokemonCard.vue';

export default defineComponent({
  name: 'Home',
  components: { PokemonCard },
  setup() {
    const title = ref('Welcome to pokeapi explorer');
    const name = ref('');
    const { foundPokemon, error, isPending, searchPokemonApi } = usePokemonApi();

    const onFetchPokemon = async() => {
      await searchPokemonApi(name.value);
    }

    return { title, onFetchPokemon, name, foundPokemon, error, isPending }
  }
});
</script>

<style>
  .error {
    color: red;
    font-size: 0.75rem;
  }

  .pokemon-name {
    width: 20rem;
  }

  .search-form {
    max-width: 20rem;
  }
</style>
