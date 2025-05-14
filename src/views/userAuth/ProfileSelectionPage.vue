<template>
  <div class="navbar">
    <Logo/>
  </div>
  <div class="back-button-container">
    <BackButton/>
  </div>
  <div class="selection-container">
    <div class="content">
      <h1>Who wants to watch ChillStream?</h1>
      <div class="profile-container">
        <div
            v-for="profile in profiles"
            :key="profile.id"
            class="profile-card"
            @click="selectProfile(profile)"
        >
          <img :src="profile.profileImage" class="profile-image" alt="profile image"/>
          <p class="profile-name">{{ profile.nickname }}</p>
        </div>

        <div>
          <button class="add-profile" @click="addProfile">+</button>
          <p class="profile-name">New Profile</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import {useRouter} from "vue-router";
import {getProfiles} from "@/service/authApi.js";
import Logo from "@/components/Logo.vue";
import BackButton from "@/components/BackButton.vue";

const profiles = ref([]);
const router = useRouter();

onMounted(async () => {
  try {
    const userId = sessionStorage.getItem("user");
    profiles.value = await getProfiles(userId);
  } catch (error) {
    console.error("Error loading profiles:", error);
  }
});

const selectProfile = (profile) => {
  sessionStorage.setItem("profile", profile._id);
  sessionStorage.setItem("nicknameProfile", profile.nickname)
  router.push("/home");
};

const addProfile = () => {
  router.push("/createProfile");
};
</script>

<style scoped>
.selection-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #000;
  position: relative;
}

.navbar {
  position: absolute;
  top: 20px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  z-index: 10;
}

.back-button-container {
  position: absolute;
  top: 60px;
  left: 20px;
  z-index: 11; /* sopra tutto */
}

.content {
  text-align: center;
  color: white;
  z-index: 2;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 30px;
}

.profile-container {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
}

.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s;
}

.profile-card:hover {
  transform: scale(1.1);
}

.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 12px;
  object-fit: cover;
  border: 3px solid transparent;
  transition: border 0.3s;
}

.profile-card:hover .profile-image {
  border: 3px solid white;
}

.profile-name {
  color: white;
  margin-top: 10px;
  font-size: 16px;
  text-align: center;
}

.add-profile {
  width: 120px;
  height: 120px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 48px;
  border: none;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-profile:hover {
  background: rgba(255, 255, 255, 0.4);
}
</style>
