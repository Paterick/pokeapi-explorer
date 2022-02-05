<template>
  <div class="home">
    <p>{{title}}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Home',
  components: {},
  setup() {
    const title = ref('Welcome to pokeapi explorer')

    return { title }
  }
});
</script>
