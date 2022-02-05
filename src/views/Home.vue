<template>
  <div class="home">
    <h2>{{title}}</h2>
    <form @submit.prevent="onFetchPokemon" class="search-form">
      <input class="pokemon-name" type="text" placeholder="Enter the name of pokeman to search for" v-model="name" >
      <button>Fetch pokemon</button>
      <div class="error" v-if="notfound">{{notfound}}</div>
    </form>

  </div>
  <PokemonCard :pokemon ="foundPokemon" v-if="foundPokemon" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { PokemonClient, Pokemon  } from 'pokenode-ts';
import PokemonCard from '@/components/PokemonCard.vue';

export default defineComponent({
  name: 'Home',
  components: { PokemonCard },
  setup() {
    const title = ref('Welcome to pokeapi explorer');
    const name = ref('');
    const notfound = ref();
    const foundPokemon = ref<Pokemon>()

    const onFetchPokemon = async() => {
      notfound.value = '';
      const api = new PokemonClient();

      await api
      .getPokemonByName(name.value.toLowerCase())
      .then((data: Pokemon) => {
        foundPokemon.value = data;
      })
      .catch(() => {
        notfound.value = `Could not find a pokemon with the name ${name.value}`
      });
    }

    return { title, onFetchPokemon, name, foundPokemon, notfound }
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
    max-width: 15rem;
  }
</style>
