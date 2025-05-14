<template>
  <div class="content-row">
    <h2>{{ title }}</h2>
    <div class="carousel-container">
      <button @click="scrollLeft" class="carousel-btn left-btn">‹</button>
      <div ref="carousel" class="content-list">
        <ContentCard v-for="content in contents" :key="content.id" :content="content"/>
      </div>
      <button @click="scrollRight" class="carousel-btn right-btn">›</button>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import ContentCard from "./ContentCard.vue";

defineProps({
  title: String,
  contents: Array,
});

const carousel = ref(null);

const scrollLeft = () => {
  if (carousel.value) {
    carousel.value.scrollBy({left: -2000, behavior: "smooth"});
  }
};

const scrollRight = () => {
  if (carousel.value) {
    carousel.value.scrollBy({left: 2000, behavior: "smooth"});
  }
};
</script>

<style scoped>
.content-row {
  color: white;
  padding: 20px 50px;
}

h2 {
  margin-bottom: 10px;
}

/* Contenitore carosello */
.carousel-container {
  position: relative;
  display: flex;
  align-items: center;
}

/* Lista dei contenuti (scroll orizzontale) */
.content-list {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 10px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.content-list::-webkit-scrollbar {
  display: none;
}

/* Pulsanti di scorrimento */
.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  transition: background 0.3s;
}

.carousel-btn:hover {
  background: rgba(0, 0, 0, 0.8);
}

.left-btn {
  left: -30px;
}

.right-btn {
  right: -30px;
}
</style>
