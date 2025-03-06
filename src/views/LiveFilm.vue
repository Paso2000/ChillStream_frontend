<template>
  <div class="stream-container">
    <!-- Sezione Video -->
    <div class="video-section">
      <div id="player"></div> <!-- YouTube Player viene creato qui -->
    </div>
    <LiveChat></LiveChat>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import {deleteView, putView} from "@/service/interactionApi.js";
import LiveChat from "@/components/LiveChat.vue"; // Per salvare nel DB

const route = useRoute();
const startTime = ref(route.query.start ? parseInt(route.query.start) : 0);
const currentTime = ref(startTime.value); // Tiene traccia del tempo attuale
let player = null;

ref("");
const loadYouTubePlayer = () => {
  window.onYouTubeIframeAPIReady = () => {
    player = new YT.Player("player", {
      height: "500",
      width: "100%",
      videoId: "lJXaNYTVjrQ", // ID del video
      playerVars: {
        autoplay: 1,
        mute: 1,
        start: startTime.value,
        rel: 0,
      },
      events: {
        onReady: () => {
          console.log("YouTube Player Pronto!");
        },
        onStateChange: () => {
          updateCurrentTime();
        }
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
  putView(
      sessionStorage.getItem("user"),
      sessionStorage.getItem("profile"),
      sessionStorage.getItem("film"),
      { timesOFTheFilm: currentTime.value }
  );
}, 30000);

onMounted(() => {
  loadYouTubePlayer();
});

onBeforeUnmount(() => {
  clearInterval(saveTimeInterval);
  updateCurrentTime(); // Assicura di prendere il tempo finale
  if(currentTime.value>190)
    deleteView(sessionStorage.getItem("user"),
        sessionStorage.getItem("profile"),
        sessionStorage.getItem("film"))
  else
  putView(
      sessionStorage.getItem("user"),
      sessionStorage.getItem("profile"),
      sessionStorage.getItem("film"),
      { timesOFTheFilm: currentTime.value }
  );
});
</script>

<style scoped>
.stream-container {
  display: flex;
  height: 100vh;
  gap: 10px;
  background: #000;
  color: white;
  padding: 20px;
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
