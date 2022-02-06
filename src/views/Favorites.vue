<template>
    <h2>Favorite Pokemon</h2>
    <div class="list-container">
        <div v-for="favoritePokemon in favorites" :key="favoritePokemon.id" class="list-row">
            <div class="list-image" @click="onShowDetail(favoritePokemon)">
                <img :src="favoritePokemon.sprites.front_default" alt="">
            </div>
            <div class="list-name" @click="onShowDetail(favoritePokemon)">
                <div @click="onShowDetail(favoritePokemon)">{{favoritePokemon.name}}</div>
            </div>
            <div class="list-button">
                <button @click="onRemoveFavorite(favoritePokemon.id)">Remove</button>
            </div>
        </div>
    </div>
    <Modal ref="pokemonDetailModal">
        <template v-slot:header>
            <div></div>
        </template>        
        <template v-slot:body>
            <PokemonCard v-if="selectedPokemon" :pokemon="selectedPokemon" />
        </template>
        <template v-slot:footer>
            <div>
                <button @click="pokemonDetailModal.closeModal()">Close</button>
            </div>
        </template>        
    </Modal>
    <div class="actions">
        <button @click="onAdd10RandomPokemonToFavorites">Add 10 Random Pokemon to Favorites</button>
    </div>

</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex';
import usePokemonApi from '@/composables/usePokemonApi';
import { Pokemon  } from 'pokenode-ts';
import PokemonCard from '@/components/PokemonCard.vue';
import Modal from '@/components/Modal.vue';

export default defineComponent({
    name: 'Favorites',
    components: { PokemonCard, Modal },    
    setup() {
        const store = useStore();
        const selectedPokemon = ref<Pokemon | null>(null);
        const pokemonDetailModal = ref();

        const favorites = computed(() => {
            return store.state.favorites.slice().sort(function(a:Pokemon, b:Pokemon ){
                return (a.name > b.name) ? 1 : -1;
            });            
        });

        const { foundPokemon, error, isPending, getPokemonById } = usePokemonApi();

        const onRemoveFavorite = (id: number) => {
            store.commit('removeFavorite', id);
        }

        const onShowDetail = (pokemon: Pokemon) => {
            selectedPokemon.value = pokemon;
            pokemonDetailModal.value.openModal();
        }

        const onAdd10RandomPokemonToFavorites = async() => {
            isPending.value = true;
            const initialCount = store.state.favorites.length;

            while( store.state.favorites.length < (initialCount + 10) ) {
                error.value = null;
                foundPokemon.value = null;
                const randomId = Math.floor(Math.random() * 900) + 1;
                await getPokemonById(randomId);
                if( !error.value && foundPokemon ) {
                    store.commit('addFavorite', foundPokemon.value);
                }
            }

            isPending.value = false;
        }

        return { favorites, onRemoveFavorite, onAdd10RandomPokemonToFavorites, isPending, onShowDetail, pokemonDetailModal, selectedPokemon }
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
        padding: 0.75rem;
        border-radius: 0.625rem;
        background: white;
        margin: 1rem 0;
        transition: all ease 0.2s;        
    }

    .list-row:hover {
        box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
        transform: scale(1.02);
        transition: all ease 0.2s;
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
