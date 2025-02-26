<template>
  <div class="homepage">
    <!-- Navbar -->
    <Navbar />

    <div class="content">
      <h1 class="page-title">Movie Library 🎬</h1>

      <!-- Trending Movies -->
      <ContentRow title="Trending Movies 🔥" :contents="allMovies" />

      <!-- Viewed Movies -->
      <ContentRow title="Viewed Movies 🎥" :contents="viewedMovies" />

      <!-- Recommended Movies -->
      <ContentRow title="Recommended Movies 🎯" :contents="recommendedMovies" />

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Navbar from "@/components/UserNavbar.vue";
import ContentRow from "@/components/ContentRow.vue";
import {getFilmList } from "@/service/contentApi.js";
import { getRecommendedList, getViewList } from "@/service/interactionApi.js";

const allMovies = ref([]);
const viewedMovies = ref([]);
const recommendedMovies = ref([]);

onMounted(async () => {
  allMovies.value = await getFilmList();

  const viewed = await getViewList(localStorage.getItem("user"), localStorage.getItem("profile"));
  viewedMovies.value = viewed.map(view => view.filmDetails);

  const recommendeds = await getRecommendedList(localStorage.getItem("user"), localStorage.getItem("profile"));
  recommendedMovies.value = recommendeds.map(recommended => recommended.filmDetails);
});
</script>

<style scoped>
/* 📌 Stili generali */
.homepage {
  background: black;
  color: white;
  min-height: 100vh;
}

/* 📌 Contenuto principale */
.content {
  padding: 20px 50px;
  margin-top: 80px;
}

/* 📌 Titolo principale */
.page-title {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
}

/* 📌 Sezione attori */
.actor-selection {
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  text-align: center;
}
</style>
