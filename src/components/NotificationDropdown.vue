<template>
  <div class="notification-container">
    <!-- Notification Icon -->
    <div class="notification-icon" @click="toggleDropdown">
      <h1>Notifiche</h1>
      <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>
    </div>

    <!-- Notification Dropdown -->
    <div v-if="isOpen" class="notification-dropdown">
      <div v-if="notifications.length === 0" class="empty-message">
        No new notifications
      </div>
      <ul>
        <li v-for="notification in notifications" :key="notification._id">
          {{notification.senderNickname+""+ notification.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getNotificationList } from "@/service/interactionApi.js";

// Props from parent component
defineProps({
  userId: String,
  profileId: String
});

const isOpen = ref(false);
const notifications = ref({
  senderNickname: "",
  ricever_id:"",
  text:"",
  isChecked:false,
  timeStamp: "Date"
}); // Initialize as an array
const unreadCount = ref(0);

// Toggle dropdown visibility
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// Format timestamp function
const formatTimestamp = (timestamp) => {
  if (!timestamp) return "Unknown time";
  const date = new Date(timestamp);
  return date.toLocaleString(); // Converts to a readable format
};

// Fetch notifications on mount
onMounted(async () => {
  try {
    const data = await getNotificationList(props.userId, props.profileId);
    notifications.value = data || []; // Ensure it's an array

    // Calculate unread notifications
    unreadCount.value = notifications.value.filter(n => !n.isChecked).length;
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
