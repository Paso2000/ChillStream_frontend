<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 class="text-2xl font-bold text-center mb-6">Login</h2>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-700">Email</label>
          <input v-model="email" type="email" required
                 class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>

        <div class="mb-4">
          <label class="block text-gray-700">Password</label>
          <input v-model="password" type="password" required
                 class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>

        <button type="submit"
                class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {getUsers} from "@/service/authApi.js";

const email = ref('paso@passini');
const password = ref('marcomangno');
const router = useRouter();

const handleLogin = async () => {
  const users = await getUsers()
  let isLogged = false

  users.forEach(user => {
    if (email.value === user.email && password.value === user.password) {
      isLogged = true;
      // Salviamo l'utente in localStorage (simulazione)
      localStorage.setItem("user",  user._id );
      router.push(`/${user._id}/profiles`); // Reindirizza alla selezione profili
    }
  })
  if(isLogged===false)
    alert("Credenziali errate!");
};
</script>
