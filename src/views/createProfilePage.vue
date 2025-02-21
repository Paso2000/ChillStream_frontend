<template>
  <div class="h-screen flex flex-col items-center justify-center bg-gray-100">
    <h2 class="text-2xl font-bold mb-4">Create Your Profile</h2>

    <form @submit.prevent="createProfile" class="bg-white p-6 rounded-lg shadow-lg w-96">
      <!-- Nickname Input -->
      <label class="block font-semibold mb-2">Nickname</label>
      <input
          v-model="form.nickname"
          type="text"
          placeholder="Enter your nickname"
          class="w-full p-2 border rounded-md mb-4"
          required
      />

      <!-- Profile Image Selection -->
      <label class="block font-semibold mb-2">Choose a Profile Image</label>
      <div class="flex justify-center gap-4">
        <div
            v-for="(image, index) in defaultImages"
            :key="index"
            class="p-2 border rounded-lg cursor-pointer"
            :class="{ 'border-blue-500': form.selectedImage === image }"
            @click="form.selectedImage = image"
        >
          <img :src="image" class="w-20 h-20 rounded-full"  alt=""/>
        </div>
      </div>

      <!-- Submit Button -->
      <button
          type="submit"
          class="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Create Profile
      </button>
    </form>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {postProfile} from "@/service/authApi.js";

const form = ref({
  nickname: "",
  selectedImage: null,
});
const router = useRouter();

// Default profile images
const defaultImages = [
  "/sfondo1.png",
  "/sfondo2.png",
  "/sfondo3.png"
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
