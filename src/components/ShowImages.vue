<template>
  <div class="row g-3">
    <div class="mt-5 pt-5" v-if="spinner">
      <Spinner class="mt-5" />
    </div>
    <!-- <div class="text-dark fw-bolder d-block fs-6">Widgets: {{ searchedWidgets }}</div> -->
    <div v-else class="col-6 col-md-4 col-xl-3" v-for="picture in pictures" :key="picture.id">
      <div class="card mb-8 shadow">
        <div class="card-body p-1">
          <img :src="picture.img_src" class="card-img" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// defineProps<{ msg: string }>()

// const count = ref(0)

import axios from "axios";
import { onMounted, ref } from "vue";
import { watch } from "vue";
import { useSearchStore } from "../store/SearchStore"
import { storeToRefs } from 'pinia'
import Spinner from './Spinner.vue'
import { Picture } from "../types/PictureInterface";

const store = useSearchStore();
const { selectRover } = storeToRefs(store);

// Watching if there are changes in the store
watch(selectRover, () => {
  getPictures();
});

const apiKey = "H4T93iMnDkQ4R8R3V8aazAdan1tgE5wR4YqANYeW";
const pictures = ref<[Picture]>();
let spinner = ref(false);

const getPictures = async () => {
  try {
    spinner.value = true;
    const response = await axios.get("https://api.nasa.gov/mars-photos/api/v1/rovers/" + selectRover.value + "/photos?sol=1200&page=1&api_key=" + apiKey);
    pictures.value = response.data.photos;
    // console.log("UserLIST: ", pictures.value);
    spinner.value = false;
  } catch (err) {
    alert("There was an error while receiving data!! " + (err as Error).message);
    spinner.value = false;
  }
};


onMounted(() => {
  // event listener for scrolling
  // window.addEventListener("scroll", addNewResults);
  getPictures();
});
</script>

<style scoped>
.card img {
  height: 16vw;
  object-fit: cover;
}
</style>