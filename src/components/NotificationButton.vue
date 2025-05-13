<template>
  <div class="notification-section" @click="handleNotificationClick" style="position: relative;">
    <p>Notification</p>
    <div v-if="unreadCount > 0" class="notification-badge">
      {{ unreadCount }}
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, watch, onUnmounted} from "vue";
import { getNotificationList } from "@/service/interactionApi.js";
import { useRouter } from "vue-router";
import {eventBus} from "@/util/eventBus.js";

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
};

// Sync with session storage updates
onMounted(() => {
  loadNotifications();
  eventBus.on("unread-updated", setUnread);
});

onUnmounted(() => {
  eventBus.off("unread-updated", setUnread);
});

const setUnread = (count) => {
  unreadCount.value = count;
  emit("updateUnreadCount", count); // se vuoi ancora notificare il parent
};

watch(unreadCount, (newCount) => {
  emit("updateUnreadCount", newCount);
});
</script>

<style scoped>
.notification-section {
  cursor: pointer;
  position: relative;
  margin: -15px 0;
}

.notification-badge {
  position: absolute;
  top: 20px;
  right: 300px;
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

@media (min-width: 768px) {
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
}
</style>
