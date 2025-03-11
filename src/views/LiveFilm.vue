<template>
  <UserNavbar/>
  <div class="stream-container">
    <!-- Sezione Video -->
    <div class="video-section">
      <div id="player"></div> <!-- YouTube Player viene creato qui -->
    </div>
    <LiveChat> </LiveChat>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import {deleteView, putView} from "@/service/interactionApi.js";
import LiveChat from "@/components/LiveChat.vue";
import UserNavbar from "@/components/UserNavbar.vue";
import {getFilm} from "@/service/contentApi.js";

const route = useRoute();
const startTime = ref(route.query.start ? parseInt(route.query.start) : 0);
const currentTime = ref(startTime.value); // Tiene traccia del tempo attuale
let player = null;
const userId = sessionStorage.getItem("user")
const profileId = sessionStorage.getItem("profile")
const filmId = sessionStorage.getItem("film")
const film = ref(null)

onMounted(async ()=>{
  film.value = await getFilm(filmId)
})

const loadYouTubePlayer = () => {
  window.onYouTubeIframeAPIReady = () => {
    player = new YT.Player("player", {
      height: "500",
      width: "100%",
      //decomment to debug
      //videoId: "lJXaNYTVjrQ",
      videoId: film.value.trailer_path,
      playerVars: {
        autoplay: 1,
        mute: 1,
        start: startTime.value,
        rel: 0,
      },
      events: {
      }
    });
  };

  if (!window.YT) {
    let tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  } else {
    window.onYouTubeIframeAPIReady();
  }
};

const updateCurrentTime = () => {
  if (player && typeof player.getCurrentTime === "function") {
    currentTime.value = Math.floor(player.getCurrentTime());
  }
};

const saveTimeInterval = setInterval(() => {
  updateCurrentTime();
  putView(userId, profileId,filmId, { timesOFTheFilm: currentTime.value });
}, 30000);

onMounted(() => {
  loadYouTubePlayer();
});

onBeforeUnmount(async () => {
  clearInterval(saveTimeInterval);
  updateCurrentTime(); // Assicura di prendere il tempo finale
  if (currentTime.value > 190)
    await deleteView(userId, profileId, filmId)
  else
   await putView(userId, profileId, filmId, {timesOFTheFilm: currentTime.value});
});
</script>

<style scoped>
.stream-container {
  display: flex;
  flex-direction: column; /* Mobile First ➜ colonna */
  width: 100%;
  height: 55vh;
  gap: 10px;
  background: #000;
  color: white;
}

@media (min-width: 768px) {
  .stream-container {
    flex-direction: row;
    margin-top: 80px;
    display: flex;
    height: 82vh;
    gap: 10px;
    background: #000;
    color: white;
    padding: 20px;
  }
}
.video-section {
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
}

iframe {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

</style>
