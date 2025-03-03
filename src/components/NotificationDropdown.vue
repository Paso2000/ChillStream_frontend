<template>
  <div class="notification-container">
    <!-- Icona Notifiche -->
    <div class="notification-icon" @click="toggleDropdown">
      <h1>Notifiche</h1>
      <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>
    </div>

    <!-- Dropdown Notifiche -->
    <div v-if="isOpen" class="notification-dropdown">
      <div v-if="notifications.length === 0" class="empty-message">
        No new notifications
      </div>
      <ul>
        <li v-for="notification in notifications" :key="notification.id">
          {{ notification.message }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isOpen = ref(false);
const notifications = ref([]);
const unreadCount = ref(0);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

onMounted(async () => {
  try {
    //const data = await getNotifications(); // Recupera notifiche
   // notifications.value = data;
    //unreadCount.value = data.filter(n => !n.read).length; // Conta le non lette
  } catch (error) {
    console.error("Error loading notifications", error);
  }
});
</script>

<style scoped>
.notification-container {
  position: relative;
}

.notification-icon {
  position: relative;
  cursor: pointer;
}

.notification-icon img {
  height: 30px;
  width: 30px;
}

.badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: red;
  color: white;
  border-radius: 50%;
  padding: 5px;
  font-size: 12px;
  min-width: 20px;
  text-align: center;
}

.notification-dropdown {
  position: absolute;
  right: 0;
  top: 40px;
  width: 200px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  padding: 10px;
}

.notification-dropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.notification-dropdown li {
  padding: 8px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}

.notification-dropdown li:last-child {
  border-bottom: none;
}

.empty-message {
  text-align: center;
  color: rgb(128, 128, 128);
  font-size: 14px;
  padding: 10px;
}
</style>
