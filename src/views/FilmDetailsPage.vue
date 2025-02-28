<template>
  <div class="movie-details">
    <div class="movie-header">
      <img :src="movie.image_path" alt="Movie Cover" class="movie-cover" />
      <div class="movie-info">
        <h1>{{ movie.title }}</h1>
        <p><strong>Release Year:</strong> {{ movie.release_year }}</p>
        <p><strong>Rating:</strong> ⭐ {{ movie.rating }}/10</p>
        <p><strong>Genre:</strong> {{ movie.genre }}</p>
      </div>
    </div>

    <!-- Bottoni per guardare il film e aggiungerlo ai consigliati -->
    <div class="movie-actions">
      <Button @click="watchMovie">🎬 Watch Now</Button>
      <Button @click="addToRecommended">⭐ Add to Recommended</Button>
    </div>

    <div class="movie-cast">
      <h2>Cast</h2>
      <ul>
        <li v-for="actor in fullActors" :key="actor._id">
          {{ actor.name }} {{ actor.surname }}
        </li>
      </ul>
    </div>

    <div class="movie-reviews">
      <h2>Reviews</h2>

      <!-- Input per scrivere una recensione -->
      <div class="review-input">
        <input v-model="newReview.text" type="text" placeholder="Write a review..." />
        <Button @click="addReview">Submit</Button>
      </div>

      <div v-if="fullReview.length === 0">No reviews yet.</div>
      <ul>
        <li v-for="review in fullReview" :key="review.id">
          <strong>{{ review.nickname }}:</strong> {{ review.text }}
        </li>
      </ul>
    </div>

    <router-link to="/" class="back-button">Back to Home</router-link>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getActor, getFilm, getReviewList, postReview } from "@/service/contentApi.js";
import Button from "@/components/Button.vue";
import {postRecommended, postView} from "@/service/interactionApi.js";

const newReview = ref({
  film_id: localStorage.getItem("film"),
  nickname: localStorage.getItem("nicknameProfile"),
  profile_id: localStorage.getItem("profile"),
  text: "",
});

const fullActors = ref([]);
const fullReview = ref([]);
const movie = ref({
  title: "",
  image: "",
  release_year: "",
  rating: "",
  genre: "",
  actors: [],
  reviews: [],
});

const route = useRoute();

// Carica i dati del film
onMounted(async () => {
  movie.value = await getFilm(localStorage.getItem("film"));

  for (const actor of movie.value.actors) {
    fullActors.value.push(await getActor(actor));
  }

  fullReview.value = await getReviewList(localStorage.getItem("film"));
});

// Aggiunge una recensione e aggiorna la lista in tempo reale
const addReview = async () => {
  try {
    await postReview(newReview.value.film_id, newReview.value);
    fullReview.value = await getReviewList(newReview.value.film_id); // Aggiorna la lista
    newReview.value.text = "";
  } catch (error) {
    alert("Review not created");
  }
};

// Simula la visualizzazione del film
const watchMovie = async () => {
  try {
    const view = ref({
      filmId: localStorage.getItem("film"),
      userId: localStorage.getItem("user"),
      profileId: localStorage.getItem("profile"),
      timesOFTheFilm: 23
    })
    await postView(view.value.userId, view.value.profileId, view.value)
    alert("Start watching the film the film");
  } catch (error) {
    alert("Could not watch the film");
  }
};

// Aggiunge il film ai consigliati
const addToRecommended = async () => {

  try {
    const recommended = ref({
      filmId: localStorage.getItem("film"),
      userId: localStorage.getItem("user"),
      profileId: localStorage.getItem("profile"),
    })
    await postRecommended(recommended.value.userId,recommended.value.profileId,recommended.value);
    alert(`${movie.value.title} added to recommended!`);
  } catch (error) {
    alert("Could not add to recommended");
  }
};
</script>

<style scoped>
.movie-details {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.movie-header {
  display: flex;
  align-items: center;
  gap: 20px;
}

.movie-cover {
  width: 200px;
  border-radius: 10px;
}

.movie-info h1 {
  margin: 0;
  font-size: 24px;
}

.movie-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.movie-cast,
.movie-reviews {
  margin-top: 20px;
}

.movie-cast ul,
.movie-reviews ul {
  list-style: none;
  padding: 0;
}

.movie-cast li,
.movie-reviews li {
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
}

.back-button {
  display: block;
  margin-top: 20px;
  text-align: center;
  padding: 10px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.back-button:hover {
  background-color: #0056b3;
}
</style>
0