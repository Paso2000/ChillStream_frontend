<template>
  <div class="h-screen flex flex-col items-center justify-center bg-gray-100">
    <h2 class="text-2xl font-bold mb-4">Choose a Profile</h2>

    <div class="grid grid-cols-2 gap-4">
      <div
          v-for="profile in profiles"
          :key="profile.id"
          class="p-4 bg-white shadow-lg rounded-lg cursor-pointer hover:bg-blue-100"
          @click="selectProfile(profile)"
      >
        <img :src="profile.profileImage" class="w-20 h-20 rounded-full mx-auto" />
        <p class="text-center mt-2">{{ profile.nickname }}</p>
      </div>

      <!-- Pulsante per aggiungere un nuovo profilo -->
      <div
          class="p-4 bg-white shadow-lg rounded-lg cursor-pointer hover:bg-blue-100 flex flex-col items-center justify-center"
          @click="addProfile"
      >
        <div class="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-4xl font-bold text-gray-600">+</div>
        <p class="text-center mt-2">Add Profile</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getProfiles } from "@/service/authApi.js";

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
  localStorage.setItem("selectedProfile", profile._id);
  router.push("/home");
};

const addProfile = () => {
  router.push("/createProfile");
};
</script>