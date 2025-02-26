<template>
  <div class="content-row">
    <h2>{{ title }}</h2>
    <div class="content-list">
      <ContentCard v-for="content in contents" :key="content.id" :content="content" />
    </div>
  </div>
</template>

<script setup>
import ContentCard from "./ContentCard.vue";
defineProps({
  title: String,
  contents: Array,
});
</script>

<style scoped>
.content-row {
  color: white;
  padding: 20px 50px;
}

h2 {
  margin-bottom: 10px;
}

.content-list {
  display: flex;
  gap: 10px;
  overflow-x: scroll;
  padding-bottom: 10px;
}

.content-list::-webkit-scrollbar {
  display: none;
}
</style>
