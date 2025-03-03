<template>
  <div class="filmDetailsPage">
    <UserNavbar/>
    <div class="movie-container">
      <div class="movie-banner" :style="{ backgroundImage: `url(${movie.image_path})` }">
        <div class="movie-overlay">
          <div class="movie-info">
            <h1>{{ movie.title }}</h1>
            <p class="release-year">{{ movie.release_year }} | ⭐ {{ movie.rating }}/10 | {{ movie.genre }}</p>
            <p class="description">{{ movie.description }}</p>

            <div class="movie-actions">
              <Button @click="watchMovie">▶ Play</Button>
              <Button @click="addToRecommended">+ My List</Button>
            </div>
          </div>
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
        <div class="review-input">
          <FormInput class="review-form" v-model="newReview.text" type="text" placeholder="Write a review..."/>
          <Button @click="addReview">Submit</Button>
        </div>
        <div v-if="fullReview.length === 0">No reviews yet.</div>
        <ul>
          <li v-for="review in fullReview" :key="review.id">
            <strong>{{ review.nickname }}:</strong> {{ review.text }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {getActor, getFilm, getReviewList, postReview} from "@/service/contentApi.js";
import Button from "@/components/Button.vue";
import {postRecommended, postView} from "@/service/interactionApi.js";
import UserNavbar from "@/components/UserNavbar.vue";
import FormInput from "@/components/FormInput.vue";

const newReview = ref({
  film_id: sessionStorage.getItem("film"),
  nickname: sessionStorage.getItem("nicknameProfile"),
  profile_id: sessionStorage.getItem("profile"),
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
  movie.value = await getFilm(sessionStorage.getItem("film"));

  for (const actor of movie.value.actors) {
    fullActors.value.push(await getActor(actor));
  }

  fullReview.value = await getReviewList(sessionStorage.getItem("film"));
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
      filmId: sessionStorage.getItem("film"),
      userId: sessionStorage.getItem("user"),
      profileId: sessionStorage.getItem("profile"),
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
      filmId: sessionStorage.getItem("film"),
      userId: sessionStorage.getItem("user"),
      profileId: sessionStorage.getItem("profile"),
    })
    await postRecommended(recommended.value.userId, recommended.value.profileId, recommended.value);
    alert(`${movie.value.title} added to recommended!`);
  } catch (error) {
    alert("Could not add to recommended");
  }
};
</script>

<style scoped>
.filmDetailsPage{
  background: linear-gradient(135deg, #000000, #111);
  color: white;
  min-height: 100vh;
}

.movie-container {
  color: white;
  font-family: Arial, sans-serif;
}

.movie-banner {
  position: relative;
  height: 400px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
}

.movie-overlay {
  background: linear-gradient(to right, rgba(0, 0, 0, 0.8), transparent);
  padding: 40px;
  width: 50%;
}

.movie-info h1 {
  font-size: 40px;
  margin-bottom: 10px;
}

.release-year {
  font-size: 16px;
  margin-bottom: 20px;
}

.description {
  font-size: 18px;
  margin-bottom: 20px;
}

.movie-actions {
  display: flex;
  gap: 10px;
}

.movie-cast, .movie-reviews {
  padding: 20px;
}

.review-form {
  max-width: 700px;
}

.review-input input {
  padding: 10px;
  width: 80%;
  margin-right: 10px;
}

</style>