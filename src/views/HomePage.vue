<template>
  <div class="homepage">
    <UserNavbar/>

    <div class="content">
      <ContentRow title="Trending Movies" :contents="allMovies"/>
      <ContentRow title="Continue to watching" :contents="viewedMovies"/>
      <ContentRow title="My List" :contents="MyListMovie"/>

    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import UserNavbar from "@/components/UserNavbar.vue";
import ContentRow from "@/components/ContentRow.vue";
import {getFilmList} from "@/service/contentApi.js";
import {getRecommendedList, getViewList} from "@/service/interactionApi.js";

const allMovies = ref([]);
const viewedMovies = ref([]);
const MyListMovie = ref([]);

onMounted(async () => {
  allMovies.value = await getFilmList();
  console.log(allMovies.value);

  const viewed = await getViewList(sessionStorage.getItem("user"), sessionStorage.getItem("profile"));
  viewedMovies.value = viewed.map(view => view.filmDetails);

  const myListMovie = await getRecommendedList(sessionStorage.getItem("user"), sessionStorage.getItem("profile"));
  MyListMovie.value = myListMovie.map(myLyst => myLyst.filmDetails);
});
</script>

<style scoped>

.homepage {
  margin-top: 80px;
  background: #000;
  color: white;
}

.content {
  padding: 20px;
}

</style>
