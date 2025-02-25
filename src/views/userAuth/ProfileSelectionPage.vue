<template>
  <div class="selection-container">
    <img src="/chillStream-logo.png" alt="Logo" class="logo"/>
    <div class="login-box">
      <h2>Who's watching?</h2>
      <div class="profile-container">
        <div
            v-for="profile in profiles"
            :key="profile.id"
            class="profile-card"
            @click="selectProfile(profile)"
        >
          <img :src="profile.profileImage" class="profile-image"/>
          <p class="profile-name">{{ profile.nickname }}</p>
        </div>
        <button class="add-profile" @click="addProfile">➕</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import {useRouter} from "vue-router";
import {getProfiles} from "@/service/authApi.js";

const profiles = ref([]);
const router = useRouter();

onMounted(async () => {
  try {
    const userId = localStorage.getItem("user");
    profiles.value = await getProfiles(userId);
  } catch (error) {
    console.error("Error loading profiles:", error);
  }
});

const selectProfile = (profile) => {
  localStorage.setItem("profile", profile._id);
  router.push("/home");
};

const addProfile = () => {
  router.push("/createProfile");
};
</script>

<style scoped>
/* Contenitore principale */
.selection-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgba(0, 0, 0);
  position: relative;
}

/* Logo */
.logo {
  position: absolute;
  top: 20px;
  left: 20px;
  height: 120px;
  transition: transform 0.3s ease-in-out;
}

/* Titolo */
h2 {
  color: white;
  margin-bottom: 20px;
  text-align: center;
}

/* Contenitore dei profili */
.profile-container {
  display: flex; /* Imposta i profili in riga */
  gap: 20px; /* Spazio tra i profili */
  justify-content: center;
  align-items: center;
}

/* Card del profilo */
.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s;
}

.profile-card:hover {
  transform: scale(1.1);
}

/* Immagine profilo */
.profile-image {
  width: 80px; /* Ridotta */
  height: 80px;
  border-radius: 50%; /* Rende l'immagine tonda */
  object-fit: cover;
  border: 2px solid white;
}

/* Nome profilo */
.profile-name {
  color: white; /* Testo in bianco */
  margin-top: 10px;
  font-size: 14px;
  text-align: center;
}

/* Bottone per aggiungere un profilo */
.add-profile {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #6a0dad;
  color: white;
  font-size: 24px;
  border: none;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}

.add-profile:hover {
  background: #8e44ad;
  transform: scale(1.1);
}
</style>
