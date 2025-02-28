<template>
  <nav class="navbar">
    <div class="navbar-box">
      <!-- Logo e sezioni della navbar -->
      <div class="left-section">
        <div class="logo">
          <img src="/chillStream-logo.png" alt="ChillStream Logo" />
        </div>
        <ul class="nav-links">
          <li @click="$emit('changeSection', 'home')">HOME</li>
          <li @click="$emit('changeSection', 'movies')">MOVIES</li>
          <li @click="$emit('changeSection', 'myList')">MY LIST</li>
        </ul>
      </div>

      <!-- Barra di ricerca e icona profilo -->
      <div class="right-section">
        <input type="text" placeholder="Search..." class="search-bar" />
        <div class="profile-icon" @click="openProfile">
          <img :src= "profile.profileImage" alt="ProfileImage" />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>

import router from "@/router/index.js";
import {getProfile} from "@/service/authApi.js";
import {onMounted, ref} from "vue";

const userId = localStorage.getItem("user")
const profileId = localStorage.getItem("profile")
let profile = ref({
  nickname:"",
  profileImage:""
})
onMounted(async () => {
  try{
    profile.value = await getProfile(userId,profileId)
  }catch (error){
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
  font-family: "Arial", sans-serif;
  width: 100%;
}

.navbar-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 15px 10px;
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
}

/* Sezione sinistra con logo e menu */
.left-section {
  display: flex;
  align-items: center;
  gap: 20px;
}

.logo img {
  height: 50px;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 20px;
}

.nav-links li {
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.nav-links li:hover {
  color: #fff;
  transform: scale(1.1);
}

/* Sezione destra con barra di ricerca e profilo */
.right-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.search-bar {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  outline: none;
}

.profile-icon img {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.profile-icon img:hover {
  transform: scale(1.1);
}
</style>
