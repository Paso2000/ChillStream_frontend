<template>
  <button class="back-button" @click="goBack">
    ⬅ Back
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.back-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;
  width: 150px;
}


.back-button:active {
  transform: scale(0.98);
}
</style>
