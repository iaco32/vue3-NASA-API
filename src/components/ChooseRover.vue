<template>
    <div class="mt-5 mb-4 position-fixed text-center">
        <label class="mb-2 fw-bold">Pick your robot</label>
        <select class="form-select" v-model="selectRover" @change="changeRover" :disabled="pausedFor5Seconds">
            <option value="curiosity">Curiosity</option>
            <option value="opportunity">Opportunity</option>
            <option value="spirit">Spirit</option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useSearchStore } from "../store/SearchStore"
let pausedFor5Seconds = ref(false);

// Pinia Store
const store = useSearchStore();
const { newSearch } = store;

const selectRover = ref(store.selectRover);

const changeRover = () => {
    // The select is disabled for 5 seconds to limit/throttle API requests.
    pausedFor5Seconds.value = true;
    newSearch(selectRover.value);
    setTimeout(() => pausedFor5Seconds.value = false, 5000);
};
</script>