<template>
  <div class="stream-container">
    <!-- Sezione Video -->
    <div class="video-section">
      <iframe
          width="100%"
          height="500"
          src="https://www.youtube.com/embed/lJXaNYTVjrQ?autoplay=1&mute=1"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
      ></iframe>
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
import { ref } from "vue";

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
</script>

<style scoped>
.stream-container {
  display: flex;
  height: 100vh;
  gap: 10px;
  background: #181818;
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
