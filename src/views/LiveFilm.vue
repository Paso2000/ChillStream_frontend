<template>
  <div class="stream-container">
    <!-- Sezione Video -->
    <div class="video-section">
      <div id="player"></div> <!-- YouTube Player viene creato qui -->
    </div>

    <!-- Sezione Chat -->
    <div class="chat-section">
      <div class="chat-header">Live Chat</div>
      <div class="chat-messages">
        <div v-for="message in messages" :key="message.id" class="chat-message">
          <strong>{{ message.user }}</strong>: {{ message.text }}
        </div>
      </div>
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Scrivi un messaggio..." class="chat-input"/>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import {deleteView, putView} from "@/service/interactionApi.js"; // Per salvare nel DB

const route = useRoute();
const startTime = ref(route.query.start ? parseInt(route.query.start) : 0);
const currentTime = ref(startTime.value); // Tiene traccia del tempo attuale
let player = null; // Variabile per il player di YouTube

const messages = ref([
  { id: 1, user: "User1", text: "Ciao a tutti!" },
  { id: 2, user: "User2", text: "Wow, che bel film!" }
]);

const newMessage = ref("");

const sendMessage = () => {
  if (newMessage.value.trim()) {
    messages.value.push({
      id: messages.value.length + 1,
      user: "Tu",
      text: newMessage.value
    });
    newMessage.value = "";
  }
};

// **Inizializza il player di YouTube**
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

  // Carica lo script dell'API YouTube se non è già presente
  if (!window.YT) {
    let tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  } else {
    window.onYouTubeIframeAPIReady();
  }
};

// **Funzione per aggiornare il tempo corrente**
const updateCurrentTime = () => {
  if (player && typeof player.getCurrentTime === "function") {
    currentTime.value = Math.floor(player.getCurrentTime());
  }
};

// **Salva il tempo nel DB ogni 30 secondi**
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

.chat-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #222;
  padding: 10px;
  border-radius: 8px;
}

.chat-header {
  font-weight: bold;
  text-align: center;
  padding: 5px;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 10px;
}

.chat-message {
  padding: 5px;
  border-bottom: 1px solid #444;
}

.chat-input {
  padding: 8px;
  border: none;
  border-radius: 5px;
  outline: none;
  width: 100%;
}
</style>
