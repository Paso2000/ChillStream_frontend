<template>
  <nav class="navbar">
    <div class="navbar-box">
      <Logo/>
      <div class="right-section">
        <NotificationDropdown :userId="userId" :profileId="profileId"/>
        <div class="profile-icon" @click="openProfile">
          <img :src="profile.profileImage" alt="ProfileImage"/>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>

import router from "@/router/index.js";
import {getProfile} from "@/service/authApi.js";
import {onMounted, ref} from "vue";
import NotificationDropdown from "@/components/NotificationDropdown.vue";
import Logo from "@/components/Logo.vue";

const userId = sessionStorage.getItem("user")
const profileId = sessionStorage.getItem("profile")
let profile = ref({
  nickname: "",
  profileImage: ""
})
onMounted(async () => {
  try {
    profile.value = await getProfile(userId, profileId)
  } catch (error) {
    alert("Can't get the profile")
  }
});

const openProfile = () => {
  router.push("/ProfileSettings")
}

</script>

<style scoped>
/* Stile Navbar */
.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.2);
}

.navbar-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 15px 20px;
  background: linear-gradient(135deg, #000000, #111);
  backdrop-filter: blur(15px);
}

/* Sezione destra con icona profilo */
.right-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.profile-icon img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin: 0 10px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.profile-icon img:hover {
  transform: scale(1.1);
}
</style>