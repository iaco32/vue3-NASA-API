import { defineStore } from "pinia";
import { ref } from "vue";

export const useSearchStore = defineStore("SearchStore", () => {
    // state
    const selectRover = ref("curiosity");

    // action
    function newSearch(newRover: string) {
        selectRover.value = newRover;
    }

    return { selectRover, newSearch }
})