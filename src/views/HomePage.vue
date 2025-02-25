<template>
  <div class="p-6 bg-gray-900 text-white min-h-screen">
    <h1 class="text-3xl font-bold mb-6 text-center">Movie Library 🎬</h1>

    <h2 class="text-2xl font-semibold mb-4">Trending Movies 🔥</h2>
    <MovieRow :movies="allMovies" />

    <h2 class="text-2xl font-semibold mt-8 mb-4">Viewed movies </h2>
    <MovieRow :movies="viewedMovies" />

    <h2 class="text-2xl font-semibold mt-8 mb-4">Recommended </h2>
    <MovieRow :movies="recommendedMovies" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import MovieRow from "@/components/MovieRow.vue";
import {getFilm, getFilmList} from "@/service/contentApi.js";
import {getRecommendedList, getViewList} from "@/service/interactionApi.js"; // Importiamo il componente MovieRow

// Liste di film (possono essere ottenute da un'API)
const allMovies = ref([]);
const viewedMovies = ref([]);
const recommendedMovies = ref([]);

onMounted(async () => {

  // Simuliamo il caricamento dei dati (in un'app reale, useremmo un'API)
  allMovies.value = await getFilmList()

  const viewed = await getViewList(localStorage.getItem("user"),localStorage.getItem("profile"))
  viewed.forEach(view => {
    viewedMovies.value.push(view.filmDetails)
  })

  const recommendeds = await getRecommendedList(localStorage.getItem("user"),localStorage.getItem("profile"))
  recommendeds.forEach(recommended => {
    recommendedMovies.value.push(recommended.filmDetails)
  })

});
</script>
