<template>
  <div
      class="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition duration-300"
      @click="goToDetails"
  >
    <img :src="coverImage" alt="Movie Cover" class="w-full h-64 object-cover">
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  movieId: String,      // ID del film
  coverImage: String    // URL dell'immagine di copertina
});

const router = useRouter();

// Funzione per aprire i dettagli del film
const goToDetails = () => {
  router.push(`/movie/${props.movieId}`);
};
</script>