<template>
  <div class="chat-section">
    <div class="chat-header">Live Chat</div>

    <div class="chat-messages">
      <div v-for="message in messages" :key="message.id" class="chat-message">
        <div class="message-line">
          <strong class="user-name">{{ message.user }}: </strong>{{ message.text }}
          <div class="timestamp">{{ message.time }}</div>
        </div>
      </div>
    </div>

    <!-- Input Section -->
    <div class="input-container">
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Scrivi un messaggio..." class="chat-input"/>
      <button @click="toggleEmojiPicker" class="emoji-button">😀</button>
    </div>

    <!-- Emoji Picker -->
    <emoji-picker v-if="showEmojiPicker" @emoji-click="addEmoji"></emoji-picker>
  </div>
</template>

<script setup>
import {ref, onMounted, onBeforeUnmount} from "vue";
import {io} from "socket.io-client";
import "emoji-picker-element";

const socket = io("http://localhost:8081");

const messages = ref([]);
const newMessage = ref("");
const showEmojiPicker = ref(false);
const nickname = sessionStorage.getItem("nicknameProfile")
const filmId = sessionStorage.getItem("film")
// Listen for messages from the server

onMounted(() => {
  socket.emit("joinRoom", filmId)
  const now = new Date();
  const formattedTime = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
  const joinMessage = {
    user: "System",
    text: `${nickname} è entrato nella chat.`,
    filmId: filmId,
    time: formattedTime
  };

  socket.emit("sendMessage", joinMessage);
});

const sendMessage = () => {
  if (newMessage.value.trim()) {
    const now = new Date();
    const formattedTime = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;

    const messageData = {
      user: nickname,
      text: newMessage.value,
      filmId: filmId,
      time: formattedTime
    };

    socket.emit("sendMessage", messageData);
    newMessage.value = "";
  }
};

//message reciver
socket.on("receiveMessage", (message) => {
  messages.value.push(message);
});

const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value;
};
// Add selected emoji to message input
const addEmoji = (event) => {
  newMessage.value += event.detail.unicode; // Get emoji from picker
};

onBeforeUnmount(() => {
  socket.disconnect();
});
</script>

<style scoped>
.chat-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #222;
  padding: 10px;
  border-radius: 8px;
  margin: 0 10px;
  min-height: 25vh;
}

@media (min-width: 769px) {
  .chat-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #222;
    padding: 10px;
    border-radius: 8px;
    min-height: 79vh;
    margin-top: -20px;
    margin-right: 30px;
  }
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
  padding: 15px;
  border-bottom: 1px solid #8a2be2;
  display: flex;
  flex-direction: column; /* Per righe separate */
}

.message-line {
  display: flex;
  align-items: center;
}

.user-name {
  margin-right: 15px;
}

.timestamp {
  font-size: 0.75rem; /* più piccolo */
  color: #aaa;
  margin-left: 20px;
}

.input-container {
  display: flex;
  align-items: center;
  gap: 5px;
}

.chat-input {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 5px;
  outline: none;
}

.emoji-button {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
