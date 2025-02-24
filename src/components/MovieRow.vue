<template>
  <div class="overflow-x-auto whitespace-nowrap py-4 px-2">
    <div class="flex space-x-4">
      <Card
          v-for="movie in movies"
          :key="movie._id"
          :movieId="movie._id"
          :coverImage="movie.image_path"
      />
    </div>
  </div>
</template>

<script setup>
import Card from "@/components/Card.vue"; // Import del componente Card

defineProps({
  movies: Array // Array di film con id e cover
});
</script>
