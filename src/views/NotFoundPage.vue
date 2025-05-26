<template>
  <div class="not-found">
    <BackButton />
    <div class="content">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  </div>
</template>

<script setup>
import BackButton from "@/components/BackButton.vue";
</script>

<style scoped>
.not-found {
  padding: 20px;
  color: white;
  background-color: black;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.content {
  margin: auto;
  text-align: center;
  width: 100%;
}
</style>

