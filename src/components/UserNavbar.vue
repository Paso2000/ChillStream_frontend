<template>
  <nav class="navbar">
    <div class="navbar-box">
      <Logo />

      <div class="hamburger-menu" @click="toggleMenu">
        <div :class="['bar', { open: menuOpen }]"></div>
        <div :class="['bar', { open: menuOpen }]"></div>
        <div :class="['bar', { open: menuOpen }]"></div>
      </div>

      <div class="right-section desktop-only">
        <NotificationButton @updateUnreadCount="updateUnreadCount" />
        <div class="help-section" @click="goToHelpPage">
          <p>Help</p>
        </div>
        <div class="profile-icon" @click="openProfile">
          <img :src="profile.profileImage" alt="ProfileImage" />
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="menuOpen" class="mobile-menu">
      <NotificationButton class="mobile-menu-item" @updateUnreadCount="updateUnreadCount" />
      <div class="mobile-menu-item" @click="goToHelpPage">
        <span>Help</span>
      </div>
      <div class="mobile-menu-item" @click="openProfile">
        <span>My Profile</span>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import router from "@/router/index.js";
import { getProfile } from "@/service/authApi.js";
import Logo from "@/components/Logo.vue";
import NotificationButton from "@/components/NotificationButton.vue"; // Import the new component

const menuOpen = ref(false);
const unreadCount = ref(0);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const goToHelpPage = () => {
  router.push("/help")
}

const userId = sessionStorage.getItem("user");
const profileId = sessionStorage.getItem("profile");

let profile = ref({
  nickname: "",
  profileImage: "",
});

const openProfile = () => {
  router.push("/ProfileSettings");
  menuOpen.value = false; // close menu after click
};

// Update unread count when emitted from NotificationButton
const updateUnreadCount = (count) => {
  unreadCount.value = count;
};

onMounted(async () => {
  try {
    profile.value = await getProfile(userId, profileId);
  } catch (error) {
    alert("Can't get the profile");
  }
});
</script>

<style scoped>
.navbar {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  color: white;
}

.navbar-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 20px 0;
  background: linear-gradient(135deg, #000000, #111);
  backdrop-filter: blur(15px);
}

@media (min-width: 768px) {
  .navbar-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 13px 20px 20px 0;
    background: linear-gradient(135deg, #000000, #111);
    backdrop-filter: blur(15px);
  }
}

.navbar-box > *:first-child {
  flex-shrink: 0;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 25px;
}


/* Mobile Hamburger */
.hamburger-menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 25px;
  height: 20px;
  cursor: pointer;
}

.bar {
  height: 3px;
  background-color: white;
  transition: all 0.3s ease-in-out;
}


.mobile-menu {
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.9);
  width: 100%;
  position: absolute;
  top: 70px; /* Altezza della navbar */
  left: 0;
  padding: 10px 0;
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.2);
}

.mobile-menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 20px;
  color: white;
  cursor: pointer;
}

.mobile-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.profile-icon img {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-left: 10px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.profile-icon img:hover {
  transform: scale(1.1);
}

.desktop-only {
  display: none;
}

@media (min-width: 768px) {
  .desktop-only {
    display: flex;
  }

  .hamburger-menu {
    display: none;
  }

  .mobile-menu {
    display: none !important;
  }

  .profile-icon img {
    height: 50px;
    width: 50px;
  }

  .help-section{
   cursor: pointer;
  }
}

</style>
