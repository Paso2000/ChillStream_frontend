<template>
  <div class="notification-container">
    <UserNavbar/>
      <BackButton/>

        <div v-if="notifications.length === 0" class="no-notifications">
          No new notifications
        </div>

        <ul class="notification-list">
          <li
              v-for="notification in notifications"
              :key="notification.id"
              @click="markAsRead(notification)"
              :class="{ unread: !notification.isChecked }"
          >
            <strong class="user-name">{{ "CHILLSTREAM" }}: </strong> {{ notification.text }}
          </li>
        </ul>
  </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import {getNotificationList, putNotification} from "@/service/interactionApi.js";
import UserNavbar from "@/components/UserNavbar.vue";
import BackButton from "@/components/BackButton.vue";

const notifications = ref([]);
const userId = sessionStorage.getItem("user"); // Replace with actual user ID logic
const profileId = sessionStorage.getItem("profile"); // Replace with actual profile ID logic

// Fetch notifications
const loadNotifications = async () => {
  try {
    const data = await getNotificationList(userId, profileId);
    notifications.value = data || [];
  } catch (error) {
    console.error("Error loading notifications:", error);
  }
};

// Mark notification as read
const markAsRead = async (notification) => {
  if (!notification.isChecked) {
    try {
      notification.isChecked = true; // Update UI immediately
      await putNotification(userId, profileId, notification._id, notification); // Send update to API
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  }
};

onMounted(() => {
  loadNotifications();
});

</script>

<style scoped>
.notification-container {
  color: white;
  padding: 20px;
}

.no-notifications {
  text-align: center;
}

.notification-list {
  list-style: none;
  padding: 0;
}

.notification-list li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  color: white; /* Testo in bianco */
}

.unread {
  font-weight: bold;
  color: red;
}
</style>
