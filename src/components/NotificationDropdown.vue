<template>
  <div class="notification-container">
    <div class="notification-icon" @click="handleNotificationClick">
      <p>Notification</p>
      <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>
    </div>

    <!-- Dropdown solo su desktop -->
    <div v-if="isOpen && !isMobile" class="notification-dropdown">
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
          {{
            notification.senderNickname + ": " + notification.text + " - " + formatTimestamp(notification.timestamp)
          }}
        </li>
      </ul>
    </div>
  </div>
</template>


<script setup>
import {ref, onMounted} from "vue";
import {useRouter} from "vue-router";
import {getNotificationList, putNotification} from "@/service/interactionApi.js";

const props = defineProps({
  userId: String,
  profileId: String
});

const router = useRouter();

const isOpen = ref(false);
const isMobile = ref(false); // NEW ➜ per controllare se è mobile
const notifications = ref([]);
const unreadCount = ref(0);

// Gestisce il click sull'icona della notifica
const handleNotificationClick = () => {
  if (isMobile.value) {
    // Se mobile ➜ Vai nella pagina notifiche
    router.push("/notification");
  } else {
    // Se desktop ➜ Apri o chiudi il dropdown
    isOpen.value = !isOpen.value;
  }
};

// Formatta timestamp
const formatTimestamp = (timestamp) => {
  if (!timestamp) return "Unknown time";
  const date = new Date(timestamp);
  return date.toLocaleString();
};

// Segna come letta
const markAsRead = async (notification) => {
  if (!notification.isChecked) {
    notification.isChecked = true;
    unreadCount.value = Math.max(0, unreadCount.value - 1);

    try {
      await putNotification(props.userId, props.profileId, notification._id, notification);
    } catch (error) {
      console.error("Errore nell'aggiornare la notifica", error);
    }
  }
};

// Check se è mobile al caricamento
onMounted(async () => {
  // Logica per sapere se è mobile (puoi raffinarla)
  isMobile.value = window.innerWidth <= 768;

  // Recupera le notifiche
  try {
    const data = await getNotificationList(props.userId, props.profileId);
    notifications.value = data || [];

    unreadCount.value = notifications.value.filter(n => !n.isChecked).length;
  } catch (error) {
    console.error("Errore nel caricamento delle notifiche", error);
  }

  // Aggiorna isMobile se cambia dimensione finestra
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth <= 768;
  });
});

</script>


<style>

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 10px;
  margin-bottom: 10px;
  background: #222;
  border-radius: 5px;
  cursor: pointer;
}

li.read {
  color: gray;
}
</style>
