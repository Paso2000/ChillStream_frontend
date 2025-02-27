<template>
  <div class="movie-details">
    <div class="movie-header">
      <img :src="movie.image" alt="Movie Cover" class="movie-cover" />
      <div class="movie-info">
        <h1>{{ movie.title }}</h1>
        <p><strong>Release Year:</strong> {{ movie.release_year }}</p>
        <p><strong>Rating:</strong> ⭐ {{ movie.rating }}/10</p>
        <p><strong>Genre:</strong> {{ movie.genre }}</p>
      </div>
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
        <button @click="addReview">Submit</button>
      </div>

      <div v-if="movie.reviews.length === 0">No reviews yet.</div>
      <ul>
        <li v-for="review in fullReview" :key="review.id">
          <strong>{{ review.profile_id }}:</strong> {{ review.text }}
        </li>
      </ul>
    </div>

    <router-link to="/" class="back-button">Back to Home</router-link>
  </div>
  <
</template>

<script setup>
import {onMounted, ref} from "vue";
import {loadRouteLocation, useRoute} from "vue-router";
import {getActor, getFilm, getReview, getReviewList, postReview} from "@/service/contentApi.js";
import {getProfile} from "@/service/authApi.js";

const newReview = ref({
  film_id: localStorage.getItem("film"),
  profile_id: localStorage.getItem("profile"),
  text:"",
})
const fullActors = ref([])
let fullReview = ref([])
// Simulated movie data
const movie = ref({
  title: "",
  image: "",
  release_year: "",
  rating: "",
  genre: "",
  actors: [],
  reviews: [],
});
useRoute();
onMounted(async () => {
  movie.value = await getFilm(localStorage.getItem("film"));
  for (const actor of movie.value.actors) {
    fullActors.value.push(await getActor(actor))
      }

  fullReview =  await getReviewList(localStorage.getItem("film"))

  for (const fullRew of fullReview) {
    const profile = await getProfile(localStorage.getItem("user"),localStorage.getItem("profile"))
    fullRew._profileId = profile.nickname
  }

});

const addReview = async () => {
  try {
    await postReview(newReview.value.film_id,newReview.value)
    alert("Review Created")
  }catch (error){
    alert("Review not created")
  }
  newReview.text = ""
}
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
