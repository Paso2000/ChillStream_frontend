<template>
  <div class="content-card">
    <img :src="content.image" :alt="content.title" class="content-img" />
  </div>
</template>

<script setup>
defineProps({
  content: Object,
});
</script>

<style scoped>
.content-card {
  width: 200px;
  height: 120px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.content-card:hover {
  transform: scale(1.1);
}

.content-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}
</style>
