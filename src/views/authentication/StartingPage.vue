<template>
  <div class="h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
    <h1 class="text-3xl font-bold mb-6">Welcome to Our Platform</h1>
    <p class="text-lg text-gray-600 mb-8">Join us and explore the best experience!</p>

    <div class="flex space-x-4">
      <button @click="goToLogin" class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
        Log In
      </button>
      <button @click="goToRegister" class="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
        Sign Up
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToLogin = () => {
  router.push("/login");
};

const goToRegister = () => {
  router.push("/register");
};
</script>
