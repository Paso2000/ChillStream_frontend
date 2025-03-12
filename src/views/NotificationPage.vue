<template>
  <div class="notifications-page">
    <UserNavbar/>
    <BackButton/>
    <div class="notifications-content">
      <div v-if="notifications.length === 0" class="empty-message">
        No notifications found.
      </div>

      <ul v-else>
        <li
            v-for="notification in notifications"
            :key="notification._id"
            :class="{ 'read': notification.isChecked }"
            @click="markAsRead(notification)"
        >
          <div class="notification-text">
            <strong>CHILLSTREAM</strong>: {{ notification.text }}
          </div>
          <div class="notification-timestamp">
            {{ formatTimestamp(notification.timestamp) }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getNotificationList, putNotification } from "@/service/interactionApi.js";
import UserNavbar from "@/components/UserNavbar.vue";
import BackButton from "@/components/BackButton.vue";

const router = useRouter();

const userId = sessionStorage.getItem("user");
const profileId = sessionStorage.getItem("profile");

const notifications = ref([]);

const markAsRead = async (notification) => {
  if (!notification.isChecked) {
    notification.isChecked = true;

    try {
      await putNotification(userId, profileId, notification._id, notification);
    } catch (error) {
      console.error("Notification update error", error);
    }
  }
};

const formatTimestamp = (timestamp) => {
  if (!timestamp) return "Unknown time";
  const date = new Date(timestamp);
  return date.toLocaleString();
};

onMounted(async () => {
  try {
    const data = await getNotificationList(userId, profileId);
    notifications.value = data || [];
  } catch (error) {
    console.error("Notification mount error", error);
  }
});
</script>

<style scoped>
.notifications-page {
  margin-top: 80px;
  background: #000;
  color: #fff;
  display: flex;
  flex-direction: column;
}

.notifications-content {
  padding: 20px;
}

.empty-message {
  text-align: center;
  color: #aaa;
  margin-top: 50px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: background 0.3s ease;
  border: 1px solid #333;
}

li:hover {
  background-color: #2a2a2a;
}

li.read {
  opacity: 0.6;
}

.notification-text {
  font-size: 1rem;
}

.notification-timestamp {
  font-size: 0.8rem;
  color: #888;
  margin-top: 5px;
}
</style>
