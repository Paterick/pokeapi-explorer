<template>
    <h2>Favorites</h2>
    <div class="list-container">
        <div v-for="favoritePokemon in favorites" :key="favoritePokemon.id" class="list-row">
            <div class="list-image">
                <img :src="favoritePokemon.sprites.front_default" alt="">
            </div>
            <div class="list-name">
                <a href="">{{favoritePokemon.name}}</a>
            </div>
            <div class="list-button">
                <button @click="onRemoveFavorite(favoritePokemon.id)">Remove</button>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex';

export default defineComponent({
    setup() {
        const store = useStore();
        const favorites = computed(() => store.state.favorites);

        const onRemoveFavorite = (id: number) => {
            store.commit('removeFavorite', id);
        }

        return { favorites, onRemoveFavorite }
    },
})
</script>

<style scoped >
    .list-container {
        padding: 1.25rem;
        align-items: center;
        max-width: 32rem;
        margin: 0 auto;
        width: 25rem;
    }

    .list-row {
        display: flex;
        align-items: center;
    }

    .list-image {
        flex: 1;
    }

    .list-image:hover {
        cursor: pointer;
    }

    .list-image img {
        max-height: 4rem;
    }

    .list-name {
        font-size: 1rem;
        flex: 1;
        text-align: left;
        text-transform: capitalize;
    }

    .list-name:hover {
        cursor: pointer;
    }

    .list-button {
        flex: 1;
    }
</style>
