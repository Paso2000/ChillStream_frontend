<template>
  <div class="profileSettingPage">
    <UserNavbar/>
    <BackButton/>
    <!-- Contenitore dei bottoni in alto a destra -->
    <div class="top-right-buttons">
      <Button @click="logout" class="up-button">Logout</Button>
      <Button @click="changeProfile" class="up-button">Change Profile</Button>
    </div>
    <PopUpNotification :message="alertMessage" :show="showAlert" :type="alertType" @close="closeAlert"/>

    <div class="selection-container">
      <div class="content">
        <h1 class="title">Profile settings</h1>

        <div class="profile-container">
          <FormInput v-model="profile.nickname" type="text" :placeholder="profile.nickname" class="input-nickname"/>

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

          <!-- Bottoni Save e Delete fianco a fianco -->
          <div class="horizontal-buttons">
            <Button @click="saveProfile" class="button">Save changes</Button>
            <Button @click="deleteProfil" class="button">Delete Profile</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import {ref, onMounted} from "vue";
import {putProfile, getProfile, deleteProfile} from "@/service/authApi.js";
import Button from "@/components/Button.vue";
import FormInput from "@/components/FormInput.vue";
import UserNavbar from "@/components/UserNavbar.vue";
import router from "@/router/index.js";
import BackButton from "@/components/BackButton.vue";
import PopUpNotification from "@/components/PupUpNotification.vue";

const userId = sessionStorage.getItem("user");
const profileId = sessionStorage.getItem("profile");

const profile = ref({
  nickname: "",
  profileImage: "",
});

const showAlert = ref(false);
const alertMessage = ref("");
const alertType = ref('error');

const defaultImages = [
  "/profile1.png",
  "/profile2.png",
  "/profile3.png",
];

onMounted(async () => {
  try {
    profile.value = await getProfile(userId, profileId)
  } catch (error) {
    alert("Can't get the profile")
  }
});

const selectImage = (image) => {
  profile.value.profileImage = image;
};

const saveProfile = async () => {
  try {
    await putProfile(userId, profileId, profile.value);
    alertMessage.value = "Profile updated successfully!";
    alertType.value = "success"
    showAlert.value = true;
  } catch (error) {
    alertMessage.value = "Failed to update profile.";
    alertType.value = "error"
    showAlert.value = true;
  }
};

const deleteProfil = async () => {
  try {
    await deleteProfile(userId, profileId);
    alertMessage.value = "Profile deleted successfully!";
    alertType.value = "success"
    showAlert.value = true;

    sessionStorage.removeItem("profile");
    setTimeout(() => {
      router.push("/profiles");
    }, 1500);

  } catch (error) {
    alertMessage.value = "Failed to delete profile.";
    alertType.value = "error"
    showAlert.value = true;

  }
};

const logout = () => {
  router.push("/")
}

const changeProfile = () => {
  router.push("/profiles")
}

const closeAlert = () => {
  showAlert.value = false;
};

</script>

<style scoped>
.profileSettingPage {
  margin-top: 80px;
  background: #000;
}

.selection-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #000;
  position: relative;
  margin-top: 90px;
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
  gap: 5px;
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

.top-right-buttons {
  position: absolute;
  top: 90px;
  right: 30px;
  display: flex;
  gap: 10px;
  z-index: 20;
}

.horizontal-buttons {
  display: flex;
  gap: 20px; /* Spazio tra i bottoni */
  justify-content: center;
  margin-top: 40px;
}

.up-button {
  padding: 5px;
  margin-top: 40px;
}

@media (min-width: 768px) {
  .up-button {
    padding: 5px;
  }
}
</style>
