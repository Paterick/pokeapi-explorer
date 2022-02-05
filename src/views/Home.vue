<template>
  <div class="home">
    <p>{{title}}</p>
    <button @click="onFetchPokemon">Fetch pokemon</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { PokemonClient } from 'pokenode-ts';

export default defineComponent({
  name: 'Home',
  components: {},
  setup() {
    const title = ref('Welcome to pokeapi explorer')

    const onFetchPokemon = async() => {
      const api = new PokemonClient();

      await api
      .getPokemonByName('luxray')
      .then((data) => console.log(data)) // will output "Luxray"
      .catch((error) => console.error(error));

    }

    return { title, onFetchPokemon }
  }
});
</script>
