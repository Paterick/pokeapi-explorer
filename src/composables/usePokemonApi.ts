import { ref } from 'vue'
import { PokemonClient, Pokemon  } from 'pokenode-ts';

const usePokemonApi = () => {
    const error = ref<string | null>(null);
    const isPending = ref(false);
    const foundPokemon = ref<Pokemon | null>(null);
    
    const searchPokemonApi = async(name: string) => {
        error.value = null;
        foundPokemon.value = null;
        isPending.value = true;
        const api = new PokemonClient();
    
        await api
        .getPokemonByName(name.toLowerCase().trim())
        .then((data: Pokemon) => {
          foundPokemon.value = data;
          isPending.value = false;
        })
        .catch(() => {
            error.value = `Could not find a pokemon with the name ${name}`;
            isPending.value = false;
        });
    }

    const getPokemonById = async(id: number) => {
        error.value = null;
        foundPokemon.value = null;
        isPending.value = true;
        const api = new PokemonClient();
    
        await api
        .getPokemonById(id)
        .then((data: Pokemon) => {
          foundPokemon.value = data;
          isPending.value = false;
        })
        .catch(() => {
            error.value = `Could not find a pokemon with the id ${id}`;
            isPending.value = false;
        });
    }    

    return { error, isPending, foundPokemon, searchPokemonApi, getPokemonById}
}

export default usePokemonApi;

