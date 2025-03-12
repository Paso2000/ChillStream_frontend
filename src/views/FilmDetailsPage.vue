<template>
  <div class="film-details">
    <UserNavbar/>
    <BackButton/>
    <div class="movie-container">
      <div class="movie-banner" :style="{ backgroundImage: `url(${movie.image_path})` }">
        <div class="movie-overlay">
          <div class="movie-info">
            <h1>{{ movie.title }}</h1>
            <p class="release-year">{{ movie.release_year }} | ⭐ {{ movie.rating }}/10 | {{ movie.genre }}</p>
            <p class="description">{{ movie.description }}</p>

            <div class="movie-actions">
              <Button @click="startWatching">
                {{ isViewed ? "⏯ Keep Watching" : "▶ Play" }}
              </Button>
              <Button @click="toggleRecommended">
                {{ isRecommended ? "✔ In My List" : "+ My List" }}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="movie-details-tabs">
      <button :class="{ active: selectedTab === 'cast' }" @click="selectedTab = 'cast'">Cast</button>
      <button :class="{ active: selectedTab === 'reviews' }" @click="selectedTab = 'reviews'">Reviews</button>
    </div>

    <div class="movie-details-content">
      <div v-if="selectedTab === 'cast'" class="movie-cast">
        <ul>
          <li v-for="actor in fullActors" :key="actor._id" @click="goToActorDetails(actor._id)" class="actor-item">
            <img src="/actor-default.jpg" :alt="actor.name" class="actor-image" />
            <span class="actor-name">{{ actor.name }} {{ actor.surname }}</span>
          </li>
        </ul>
      </div>

      <div v-if="selectedTab === 'reviews'">
        <UserReview :filmId="filmId" :reviews="fullReview" @updateReviews="fullReview = $event" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {getActor, getFilm, getReviewList, postReview} from "@/service/contentApi.js";
import Button from "@/components/Button.vue";
import {
  deleteRecommended, deleteView,
  getRecommendedList, getView,
  getViewList,
  postRecommended,
  postView
} from "@/service/interactionApi.js";
import UserNavbar from "@/components/UserNavbar.vue";
import router from "@/router/index.js";
import UserReview from "@/components/UserReview.vue";
import BackButton from "@/components/BackButton.vue";


const fullActors = ref([]);
const fullReview = ref([]);
const isRecommended = ref(false);
let isViewed = ref(false)
const userId = sessionStorage.getItem("user")
const profileId = sessionStorage.getItem("profile")
const filmId = sessionStorage.getItem("film")
ref({
  film_id: filmId,
  nickname: sessionStorage.getItem("nicknameProfile"),
  profile_id: profileId,
  text: "",
});
const movie = ref({
  title: "",
  image: "",
  release_year: "",
  rating: "",
  genre: "",
  actors: [],
  reviews: [],
});
const selectedTab = ref('cast');

// Carica i dati del film
onMounted(async () => {
  movie.value = await getFilm(filmId);

  for (const actor of movie.value.actors) {
    fullActors.value.push(await getActor(actor));
  }

  fullReview.value = await getReviewList(filmId);


  const recommendedList = await getRecommendedList(userId, profileId);
  isRecommended.value = recommendedList.some((rec) => rec.filmId === filmId);

  const viewedList = await getViewList(userId, profileId);
  isViewed.value = viewedList.some((view) => view.filmId === filmId);

});

const goToActorDetails = (actorId) => {
  sessionStorage.setItem("actor", actorId)
  router.push("/ActorDetails")
}

// Simula la visualizzazione del film
const startWatching = async () =>
    {
      try {
        if (!isViewed.value) {
          const newView = ref({
            filmId: filmId,
            userId: userId,
            profileId: profileId,
            timesOFTheFilm: 0
          })
          await postView(userId, profileId, newView.value);
          router.push({ path: "/live", query: { start:  newView.value.timesOFTheFilm} });
        } else {
          const view = await getView(userId, profileId,filmId)
          router.push({ path: "/live", query: { start: view.timesOFTheFilm } });
        }
      } catch (error) {
        alert("Could not start watching the film.");
      }

    }
;

const toggleRecommended = async () => {

  const recommended = ref({
    filmId: filmId,
    userId: userId,
    profileId: profileId,
  })
  try {
    if (isRecommended.value) {
      await deleteRecommended(userId, profileId, filmId);
      isRecommended.value = false;
      alert(`${movie.value.title} removed from recommended!`);
    } else {
      await postRecommended(userId, profileId, recommended.value);
      isRecommended.value = true;
      alert(`${movie.value.title} added to recommended!`);
    }
  } catch (error) {
    alert("Could not update recommended list.");
  }
}
</script>

<style scoped>
.film-details {
  margin-top: 80px;
  background: #000;
  color: white;
  min-height: 100vh;
}

.movie-container {
  color: white;
}

.movie-banner {
  position: relative;
  height: 450px;
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

.movie-details-tabs {
  display: flex;
  gap: 15px;
  padding: 20px;
}

.movie-details-content {
  padding: 20px;
}

.movie-details-tabs button {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: rgb(128, 128, 128);
}

.movie-details-tabs .active {
  color: white;
  border-bottom: 2px solid rgba(106, 13, 173, 0.88);
}

.actor-item{
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 8px;
}

.actor-name {
  font-size: 16px;
  color: #fff;
}

.actor-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
}
</style>