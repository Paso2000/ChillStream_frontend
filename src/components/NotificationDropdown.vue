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
        <li
            v-for="notification in notifications"
            :key="notification._id"
            @click="markAsRead(notification)"
            :class="{ 'read': notification.isChecked }"
        >
          {{ notification.senderNickname + ": " + notification.text + " - " + formatTimestamp(notification.timestamp) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {getNotificationList, putNotification} from "@/service/interactionApi.js";

// Props dal componente padre
const props = defineProps({
  userId: String,
  profileId: String
});

const isOpen = ref(false);
const notifications = ref({

}); // Inizializzato come array
const unreadCount = ref(0);

// Toggle per aprire/chiudere il menu notifiche
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// Formatta il timestamp in modo leggibile
const formatTimestamp = (timestamp) => {
  if (!timestamp) return "Unknown time";
  const date = new Date(timestamp);
  return date.toLocaleString();
};

// Segna una notifica come letta
const markAsRead = async (notification) => {
  if (!notification.isChecked) {
    notification.isChecked = true;  // Aggiorna lo stato localmente
    unreadCount.value = Math.max(0, unreadCount.value - 1); // Riduci il conteggio

    try {
      await putNotification(props.userId, props.profileId, notification._id,notification);
    } catch (error) {
      console.error("Errore nell'aggiornare la notifica", error);
    }
  }
};

// Recupera le notifiche all'avvio
onMounted(async () => {
  try {
    const data = await getNotificationList(props.userId, props.profileId);
    notifications.value = data || [];

    // Conta le notifiche non lette
    unreadCount.value = notifications.value.filter(n => !n.isChecked).length;
  } catch (error) {
    console.error("Errore nel caricamento delle notifiche", error);
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
  width: 250px;
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
  color: #111;
  padding: 8px;
  border-bottom: 1px solid #000;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.notification-dropdown li.read {
  color: gray;
}

.notification-dropdown li:hover {
  background: #f0f0f0;
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
