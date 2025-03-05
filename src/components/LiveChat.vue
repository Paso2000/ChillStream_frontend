<template>
  <div class="chat-section">
    <div class="chat-header">Live Chat</div>
    <div class="chat-messages">
      <div v-for="message in messages" :key="message.id" class="chat-message">
        <strong>{{ message.user }}</strong>: {{ message.text }}
      </div>
    </div>
    <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Scrivi un messaggio..." class="chat-input"/>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { io } from "socket.io-client";

const socket = io("http://localhost:8081"); // Connect to Socket.IO backend

const messages = ref([]);
const newMessage = ref("");

// Listen for messages from the server
socket.on("receiveMessage", (message) => {
  messages.value.push(message);
});

// Send message function
const sendMessage = () => {
  if (newMessage.value.trim()) {
    const messageData = {
      user: "Tu",
      text: newMessage.value,
    };

    socket.emit("sendMessage", messageData); // Send message to server
    newMessage.value = ""; // Clear input field
  }
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

.chat-input {
  padding: 8px;
  border: none;
  border-radius: 5px;
  outline: none;
  width: 100%;
}
</style>
