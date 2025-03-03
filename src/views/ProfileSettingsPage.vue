<template>
  <div class="profileSettingPage">
    <UserNavbar/>
    <div class="selection-container">
      <!-- Profile Selection -->
      <div class="content">
        <h1 class="title">Profile settings</h1>

        <div class="profile-container">
          <FormInput v-model="profile.nickname" type="text" :placeholder="profile.nickname" class="input-nickname"/>

          <!-- Image Selection -->
          <div class="grid grid-cols-3 gap-4 mt-4">
            <div
                v-for="(image, index) in defaultImages"
                :key="index"
                class="profile-image-container"
                :class="{ 'selected': profile.profileImage === image }"
                @click="selectImage(image)"
            >
              <img :src="image" class="profile-image" alt="Profile Image"/>
            </div>
          </div>

          <div class="mt-4">
            <Button @click="saveProfile" class="save-button">Save changes</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import {putProfile, getProfile} from "@/service/authApi.js";
import Button from "@/components/Button.vue";
import FormInput from "@/components/FormInput.vue";
import UserNavbar from "@/components/UserNavbar.vue";

const userId = localStorage.getItem("user");
const profileId = localStorage.getItem("profile");

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
  try {
    profile.value = await getProfile(userId, profileId)
  } catch (error) {
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
.profileSettingPage {
  margin-top: 80px;
  background: linear-gradient(135deg, #000000, #111);
}

.selection-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #000000, #111);
  position: relative;
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
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
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
