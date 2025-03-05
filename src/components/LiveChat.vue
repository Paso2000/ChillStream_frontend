<template>
  <div class="chat-section">
    <div class="chat-header">Live Chat</div>

    <!-- Messages Display -->
    <div class="chat-messages">
      <div v-for="message in messages" :key="message.id" class="chat-message">
        <strong>{{ message.user }}</strong>: {{ message.text }}
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
import "emoji-picker-element"; // Import emoji picker

const socket = io("http://localhost:8081");

const messages = ref([]);
const newMessage = ref("");
const showEmojiPicker = ref(false); // Toggle emoji picker
const nickname = sessionStorage.getItem("nicknameProfile")
// Listen for messages from the server
socket.on("receiveMessage", (message) => {
  messages.value.push(message);
});

// Send message function
const sendMessage = () => {
  if (newMessage.value.trim()) {
    const messageData = {
      user: nickname,
      text: newMessage.value,
    };

    socket.emit("sendMessage", messageData);
    newMessage.value = "";
  }
};

// Toggle emoji picker visibility
const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value;
};

// Add selected emoji to message input
const addEmoji = (event) => {
  newMessage.value += event.detail.unicode; // Get emoji from picker
};

// Cleanup on unmount
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
