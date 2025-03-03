<template>
  <div class="navbar">
    <Logo />
  </div>

  <div class="selection-container">
    <!-- Profile Selection -->
    <div class="content">
      <h1 class="title">Create New Profile</h1>

      <div class="profile-container">
        <FormInput v-model="form.nickname" type="text" placeholder="Nickname" required class="input-nickname" />

        <!-- Image Selection -->
        <div class="grid grid-cols-3 gap-4 mt-4">
          <div
              v-for="(image, index) in defaultImages"
              :key="index"
              class="profile-image-container"
              :class="{ 'selected': form.profileImage === image }"
              @click="form.profileImage = image"
          >
            <img :src="image" class="profile-image" alt="Profile Image" />
          </div>
        </div>

        <div class="mt-4">
          <Button @click="createProfile" class="save-button">Save</Button>
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
    const profile = await postProfile(sessionStorage.getItem("user"),form.value)
    sessionStorage.setItem("profile",profile._id)
    // Redirect to home after creating profile
    await router.push("/profiles");
    alert("profile created ")
  } catch (error) {
    console.error("Error creating profile", error);
  }
}};
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
  padding: 0 50px;
  z-index: 10;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: white;
  text-align: center;
}

.input-nickname {
  margin-bottom: 40px;
  width: 100%;
}

.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.grid {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.profile-image-container {
  padding: 5px;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out, border 0.3s;
}

.profile-image-container.selected {
  transform: scale(1);
  border: 3px solid #ffffff;
}

.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 12px;
  object-fit: cover;
  border: 3px solid transparent;
  transition: border 0.3s;
}

.save-button {
  margin-top: 40px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

</style>