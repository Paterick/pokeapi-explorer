<template>
    <div class="pokemon-card">
      <div class="thumbnail"><img :src="pokemon.sprites.other.home.front_default" alt=""></div>
      <div class="info">
        <h3>{{pokemon.name}}</h3>
        <p>Height: {{pokemon.height}} Weight: {{pokemon.weight}}</p>
        <div class="move" v-for="move in pokemon.moves" :key="move.move.name">{{move.move.name}}</div>
      </div>
    </div>    
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    props: { pokemon: {required: true, type: Object} },
    setup() {
        const placeholder = ref();

        return { placeholder }
    },
})
</script>

<style lang="scss" scoped>

</style>
