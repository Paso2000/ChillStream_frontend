<template>
  <div class="actor-details">
    <UserNavbar />
    <BackButton />
    <div v-if="actor" class="actor-info">
      <img src=/actor-default.jpg :alt="actor.name" class="actor-image" />
      <div class="actor-bio">
        <h1>{{ actor.name }} {{ actor.surname }}</h1>
        <p>{{ actor.date_of_birth }}</p>
      </div>
    </div>

    <div class="actor-movies">
      <h2>Filmography</h2>
      <ul v-if="movies.length > 0">
        <li v-for="movie in movies" :key="movie._id" @click="goToMovie(movie._id)">
          <img :src="movie.image_path" :alt="movie.title" class="movie-thumbnail" />
          <span>{{ movie.title }} ({{ movie.release_year }})</span>
        </li>
      </ul>
      <p v-else>No movies found for this actor.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getActor, getFilm } from "@/service/contentApi.js";
import UserNavbar from "@/components/UserNavbar.vue";
import BackButton from "@/components/BackButton.vue";

const router = useRouter();
const movies = ref([]);
const actorId = sessionStorage.getItem("actor")
const actor = ref({
  name:"",
  surname:"",
  date_of_birth:"",
  films:[]
})

onMounted(async () => {
  actor.value = await getActor(actorId);

  if (actor.value && actor.value.films) {
    for (const movieId of actor.value.films) {
      const movie = await getFilm(movieId);
      movies.value.push(movie);
    }
  }
});

const goToMovie = (filmId) => {
  sessionStorage.setItem("film", filmId)
  router.push(`/film`);

};
</script>

<style scoped>
.actor-details {
  margin-top: 80px;
  color: white;
  padding: 20px;
  background: #000;
  text-align: left;
}

.actor-info {
  display: flex;
  gap: 20px;
  padding: 20px;
  max-width: 800px;
}

.actor-image {
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
}

.actor-bio {
  text-align: left;
}

.actor-movies {
  margin-top: 30px;
}

.actor-movies h2 {
  font-size: 24px;
  margin-bottom: 15px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #555;
  transition: background 0.2s;
}

li:hover {
  background: rgba(255, 255, 255, 0.1);
}

.movie-thumbnail {
  width: 50px;
  height: 75px;
  object-fit: cover;
  border-radius: 5px;
}
</style>
