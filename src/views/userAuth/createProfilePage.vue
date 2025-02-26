<template>
  <div class="navbar">
    <Logo/>
  </div>
  <div class="selection-container">
    <!-- Selezione profilo -->
    <div class="content">
      <h1>Create new profile</h1>

      <div class="profile-container">
        <FormInput v-model="form.nickname" type="email" placeholder="Nickname" required/>
        <p class="profile-name">Choose an image</p>
        <div
            v-for="(image, index) in defaultImages"
            :key="index"
            class="profile-card"
            :class="{ 'border-blue-500': form.selectedImage === image }"
            @click="form.selectedImage = image"
        >
          <img :src="image" class="profile-image"  alt=""/>
        </div>
        <div>
           <Button @click="handleLogin">Save</Button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {postProfile} from "@/service/authApi.js";
import Logo from "@/components/Logo.vue";
import FormInput from "@/components/FormInput.vue";
import Button from "@/components/Button.vue";

const form = ref({
  nickname: "",
  selectedImage: null,
});
const router = useRouter();

// Default profile images
const defaultImages = [
  "/profile1.png",
  "/profile2.png",
  "/profile3.png"
];

// Function to handle form submission
const createProfile = async () => {
  if (!form.selectedImage.value) {
    alert("Please select a profile image.");
    return;
  }

  try {
    const profile = await postProfile(localStorage.getItem("user"),form)
    localStorage.setItem("profile",profile._id)
    // Redirect to home after creating profile
    await router.push("/home");
  } catch (error) {
    console.error("Error creating profile", error);
  }
};
</script>

<style scoped>
/* 📌 Contenitore principale con sfondo */
.selection-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #141414; /* Sfondo nero come Netflix */
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
  padding: 0 50px;
  z-index: 10;
}

/* 📌 Contenuto principale */
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

/* 📌 Contenitore profili */
.profile-container {
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: center;
}
/* 📌 Card profilo */
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

/* 📌 Immagine profilo */
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

/* 📌 Nome profilo */
.profile-name {
  color: white;
  margin-top: 10px;
  font-size: 16px;
  text-align: center;
}

/* 📌 Bottone + per aggiungere un profilo */
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