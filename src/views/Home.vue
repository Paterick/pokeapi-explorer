<template>
  <div class="home">
    <p>{{title}}</p>
    <input type="text" placeholder="Enter name of pokeman to search" v-model="name" ><button @click="onFetchPokemon">Fetch pokemon</button>
  </div>
  <div v-if="foundPokemon">
    <PokemonCard :pokemon ="foundPokemon" />
  </div>
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
    const foundPokemon = ref<Pokemon>()

    const onFetchPokemon = async() => {
      const api = new PokemonClient();

      await api
      .getPokemonByName(name.value.toLowerCase())
      .then((data: Pokemon) => {
        foundPokemon.value = data;
        console.log(data);
      })
      .catch((error) => console.error(error));

    }

    return { title, onFetchPokemon, name, foundPokemon }
  }
});
</script>
