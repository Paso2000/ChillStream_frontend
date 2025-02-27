<template>
  <div v-if="content" @click="goToDetails" class="content-card">
    <img :src="content.image_path" :alt="content.title" class="content-img" />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  content: Object,
});

const router = useRouter();

const goToDetails = () => {
  console.log(props.content)
  if (props.content && props.content._id) {
    console.log("Navigating to film with ID:", props.content._id);
    localStorage.setItem("film", props.content._id);
    router.push(`/film`);
  } else {
    console.error("Film ID is missing!");
  }
};
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