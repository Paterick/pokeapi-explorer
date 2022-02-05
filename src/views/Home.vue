<template>
  <div class="home">
    <p>{{title}}</p>
    <input type="text" placeholder="Enter name of pokeman to search" v-model="name" ><button @click="onFetchPokemon">Fetch pokemon</button>
  </div>
  <div v-if="foundPokemon">
    <div class="pokemon-detail">
      <div class="thumbnail"><img src="foundPokemon.sprites.frontdefault" alt=""></div>
      <div class="info">
        <h3>{{foundPokemon.name}}</h3>
        <p>Height: {{foundPokemon.height}} Weight: {{foundPokemon.weight}}</p>
        <div class="move" v-for="move in foundPokemon.moves" :key="move.name">{{move.name}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { PokemonClient, Pokemon  } from 'pokenode-ts';

export default defineComponent({
  name: 'Home',
  components: {},
  setup() {
    const title = ref('Welcome to pokeapi explorer');
    const name = ref('');
    const foundPokemon = ref<Pokemon>()

    const onFetchPokemon = async() => {
      const api = new PokemonClient();

      await api
      .getPokemonByName(name.value)
      .then((data: Pokemon) => {
        foundPokemon.value = data;
      })
      .catch((error) => console.error(error));

    }

    return { title, onFetchPokemon, name, foundPokemon }
  }
});
</script>
