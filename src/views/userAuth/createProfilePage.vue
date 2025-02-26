<template>
  <div class="navbar">
    <Logo />
  </div>

  <div class="selection-container">
    <!-- Profile Selection -->
    <div class="content">
      <h1>Create New Profile</h1>

      <div class="profile-container">
        <FormInput v-model="form.nickname" type="text" placeholder="Nickname" required />

        <p class="profile-name">Choose an image</p>

        <!-- Selected Image Preview -->
        <div v-if="form.profileImage" class="selected-image-preview">
          <p>Selected Image:</p>
          <img :src="form.profileImage" class="w-24 h-24 rounded-full border-2 border-blue-500" />
        </div>

        <!-- Image Selection -->
        <div class="grid grid-cols-3 gap-4 mt-4">
          <div
              v-for="(image, index) in defaultImages"
              :key="index"
              class="p-2 border rounded-lg cursor-pointer"
              :class="{ 'border-blue-500': form.profileImage === image }"
              @click="form.profileImage = image"
          >
            <img :src="image" class="w-20 h-20 rounded-full" alt="Profile Image" />
          </div>
        </div>

        <div class="mt-4">
          <Button @click="createProfile">Save</Button>
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

const form = ref({
  nickname: "",
  profileImage: "",
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
  if (!form.value.profileImage&&!form.value.nickname) {
    alert("Please select a profile image.");
  }else {
  try {
    const profile = await postProfile(localStorage.getItem("user"),form.value)
    localStorage.setItem("profile",profile._id)
    // Redirect to home after creating profile
    await router.push("/profiles");
    alert("profile created ")
  } catch (error) {
    console.error("Error creating profile", error);
  }
}};
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