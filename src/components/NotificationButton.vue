<template>
  <div class="notification-section" @click="handleNotificationClick" style="position: relative;">
    <p>Notification</p>
    <div v-if="unreadCount > 0" class="notification-badge">
      {{ unreadCount }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { getNotificationList } from "@/service/interactionApi.js";
import { useRouter } from "vue-router";

const emit = defineEmits(["updateUnreadCount"]);

const router = useRouter();
const unreadCount = ref(0);
const userId = sessionStorage.getItem("user");
const profileId = sessionStorage.getItem("profile");

// Fetch unread notifications
const loadNotifications = async () => {
  try {
    const data = await getNotificationList(userId, profileId);
    const unread = data ? data.filter(n => !n.isChecked).length : 0;
    unreadCount.value = unread;

    // Emit unread count to parent (Navbar)
    emit("updateUnreadCount", unread);
  } catch (error) {
    console.error("Error loading notifications:", error);
  }
};

// Mark notifications as read when visiting the notification page
const handleNotificationClick = () => {
  router.push("/notification");

  // Reset unread count (Assuming user will see all notifications)
  unreadCount.value = 0;
  emit("updateUnreadCount", 0);
};

// Sync with session storage updates
onMounted(() => {
  loadNotifications();
  window.addEventListener("storage", () => {
    const storedCount = sessionStorage.getItem("unreadCount");
    unreadCount.value = storedCount ? parseInt(storedCount) : 0;
  });
});

watch(unreadCount, (newCount) => {
  emit("updateUnreadCount", newCount);
});
</script>

<style scoped>
.notification-section {
  cursor: pointer;
  position: relative;
}

.notification-badge {
  position: absolute;
  top: -3px;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
}
</style>
