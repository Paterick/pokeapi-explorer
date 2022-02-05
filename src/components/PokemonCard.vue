<template>
    <div class="pokemon-card-container">
        <div class="pokemon-card">
            <div class="card-header">{{pokemon.name}}</div>
            <div class="card-image">
                <img :src="pokemon.sprites.other.home.front_default" alt="">
            </div>
        <div class="card-stats">
            Height: {{pokemon.height}} Weight: {{pokemon.weight}}
        </div>
        <div class="card-moves-container">
            <div class="card-move-title">Moves</div>
            <div class="card-move-list">
                <div class="card-move" v-for="move in pokemon.moves" :key="move.move.name">
                    {{move.move.name}}
                </div>
            </div>

        </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { Pokemon  } from 'pokenode-ts';

export default defineComponent({
    props: { pokemon: {required: true, type: Object as PropType<Pokemon>} },
    setup() {
        const placeholder = ref();

        return { placeholder }
    },
})
</script>

<style scoped>
    .pokemon-card-container {
        display: flex;
        padding: 1.25rem;
        align-items: center;
        flex-direction: column;    
    }

    .pokemon-card {
        border: 0.125rem solid black;
        border-radius: 0.625rem;
        width: 32rem;
    }

    .card-header {
        justify-content: flex-start;
        font-size: 1.25rem;
        text-transform: capitalize;
        background-color: lightgray;
        width: 100%;
    }

    .card-image {
        justify-content: center;
        align-content: center;
        width: 100%;
    }

    .card-stats {
        width: 100%;
        font-size: 0.75rem;
        background-color: lightyellow;
        padding: 0.5rem 0;
        margin-bottom: 1rem;
    }

    .card-moves-container {
        width: 100%;
        padding: 1rem;
    }

    .card-move-list {
        max-height: 12rem;
        overflow-y: auto;
        width: 95%;
        display: flex;
        flex-wrap: wrap;

    }

    .card-move-title {
        width: 100%;
        font-size: 0.75rem;
        text-decoration: underline;
        padding-bottom: 1rem;
    }

    .card-move {
        width: 33%;
        font-size: 0.75rem;
        text-align: left;
    }
</style>
