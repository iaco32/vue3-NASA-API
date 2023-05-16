<template>
  <div class="row g-3">
    <div class="mt-5 pt-5" v-if="spinner">
      <Spinner class="mt-5" />
    </div>
    <div v-else class="col-6 col-md-4 col-xl-3" v-for="picture in displayedpictures" :key="picture.id">
      <div class="card mb-8 shadow">
        <div class="card-body p-1">
          <img :src="picture.img_src" class="card-img" />
        </div>
      </div>
      <div class="position-fixed bottom-0 end-0 mb-4 me-4" v-if="showScrollTopButton()">
        <button type="button" class="btn btn-danger" @click="goToTop">
          Scroll to Top
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// defineProps<{ msg: string }>()

// const count = ref(0)

import axios from "axios";
import { onMounted, onUnmounted, ref } from "vue";
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
const pictures = ref<Picture[]>([]); //Array of objects from the API call
const displayedpictures = ref<Picture[]>([]); // Array of objects to display
const visibleCount = ref(24); // Initial number of images to display
const picturesPerLoad = 24; // Number of images to add each time with the infinite scrolling
const canShowMore = ref(false); // Flag to add or not new images
let spinner = ref(false);

const getPictures = async () => {
  try {
    spinner.value = true;
    const response = await axios.get("https://api.nasa.gov/mars-photos/api/v1/rovers/" + selectRover.value + "/photos?sol=1001&api_key=" + apiKey);
    pictures.value = response.data.photos;
    console.log("pictureLIST: ", pictures.value);
    displayedpictures.value = pictures.value.slice(0, visibleCount.value);
    canShowMore.value = visibleCount.value < pictures.value.length;
    spinner.value = false;
  } catch (err) {
    alert("There was an error while receiving data!! " + (err as Error).message);
    spinner.value = false;
  }
};

// function to add a Scroll to Top button at the bottom of the page
const showScrollTopButton = () => {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    return true;
  }
  return false;
};

const goToTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

/**
 * this function implements the infinite scroll and adds new 24 pictures at once
 * window.innerHeight: the number of pixels for the height of the screen;
 * window.scrollY: returns the number of pixels that the document is currently scrolled vertically.
 * document.documentElement.offsetHeight: the amount of pixels for the entire height of the document element;
 * if window.innerHeight + window.scrollY is greater than document.documentElement.offsetHeight, the end of the page has been reached and the endOfPage variable is true
 */
const addNewResults = () => {
  let endOfPage =
    window.innerHeight + window.scrollY >=
    document.documentElement.offsetHeight;

  if (endOfPage && canShowMore.value) {
    visibleCount.value += picturesPerLoad;
    displayedpictures.value = pictures.value.slice(0, visibleCount.value);
    canShowMore.value = visibleCount.value < pictures.value.length;
  }
};


onMounted(() => {
  // event listener for scrolling
  window.addEventListener("scroll", addNewResults);
  getPictures();
});

onUnmounted(() => {
  // remove event listener for scrolling
  window.removeEventListener("scroll", addNewResults)
});
</script>

<style scoped>
.card img {
  height: 16vw;
  object-fit: cover;
}
</style>