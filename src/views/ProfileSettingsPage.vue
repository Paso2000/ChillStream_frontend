<template>
  <div class="settings-profile">
    <h1>Profile Settings</h1>

    <!-- Nickname Change -->
    <div class="form-group">
      <label for="nickname">Change Nickname</label>
      <FormInput v-model="profile.nickname" id="nickname" type="text" :placeholder= profile.nickname />
    </div>

    <!-- Profile Image Selection -->
    <div class="form-group">
      <label>Select Profile Image</label>
      <div class="image-selection">
        <div
            v-for="(image, index) in defaultImages"
            :key="index"
            class="profile-image"
            :class="{ selected: profile.profileImage === image }"
            @click="selectImage(image)"
        >
          <img :src="image" alt="Profile Image" />
        </div>
      </div>
    </div>

    <!-- Save Button -->
    <Button @click="saveProfile">Save Changes</Button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { putProfile, getProfile } from "@/service/authApi.js";
import Button from "@/components/Button.vue";
import FormInput from "@/components/FormInput.vue";

const userId = sessionStorage.getItem("user");
const profileId = sessionStorage.getItem("profile");

const profile = ref({
  nickname: "",
  profileImage: "",
});

const defaultImages = [
  "/profile1.png",
  "/profile2.png",
  "/profile3.png",
];

// Carica il profilo all'avvio
onMounted(async () => {
  try{
    profile.value = await getProfile(userId,profileId)
  }catch (error){
    alert("Can't get the profile")
  }
});

// Metodo per selezionare un'immagine
const selectImage = (image) => {
  profile.value.profileImage = image;
};

// Salva il profilo aggiornato
const saveProfile = async () => {
  try {
    await putProfile(userId, profileId, profile.value);
    alert("Profile updated successfully!");
  } catch (error) {
    alert("Failed to update profile.");
  }
};
</script>

<style scoped>
.settings-profile {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.image-selection {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.profile-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border 0.3s ease-in-out;
}

.profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.selected {
  border-color: #007bff;
}
</style>
