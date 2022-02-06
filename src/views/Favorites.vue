<template>
    <div><p>Favorites</p></div>
    <div v-for="favorite in favorites" :key="favorite">{{favorite}}</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex';

export default defineComponent({
    setup() {
        const store = useStore();
        const placeholder = ref('');
        const favorites = computed(() => store.state.favorites);

        return { placeholder, favorites }
    },
})
</script>

<style scoped >

</style>
