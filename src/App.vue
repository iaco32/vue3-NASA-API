<template>
  <div class="container-fluid">
    <div class="row mt-2">
      <div class="col-3 d-flex justify-content-center"></div>
      <div class="col-9 d-flex justify-content-center pe-4">
        <h1 class="text-center mt-2 mb-4">The Mars Files</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-3 d-flex justify-content-center">
        <ChooseRover />
      </div>
      <div class="col-9 d-flex justify-content-center pe-4">
        <ShowImages />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChooseRover from './components/ChooseRover.vue'
import ShowImages from './components/ShowImages.vue'
</script>

