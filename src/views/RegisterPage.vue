<template>
  <div class="h-screen flex flex-col items-center justify-center bg-gray-100">
    <h2 class="text-2xl font-bold mb-4">Register</h2>

    <form @submit.prevent="registerUser" class="bg-white p-6 rounded-lg shadow-lg w-96">
      <div class="mb-4">
        <label class="block text-sm font-medium">Name</label>
        <input v-model="form.name" type="text" class="w-full p-2 border rounded" required />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium">Surname</label>
        <input v-model="form.surname" type="text" class="w-full p-2 border rounded" required />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium">Email</label>
        <input v-model="form.email" type="email" class="w-full p-2 border rounded" required />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium">Password</label>
        <input v-model="form.password" type="password" class="w-full p-2 border rounded" required />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium">Date of Birth</label>
        <input v-model="form.date_of_birth" type="date" class="w-full p-2 border rounded" required />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium">Payment Method</label>
        <select v-model="form.paymentMethod" class="w-full p-2 border rounded">
          <option value="carta">Carta</option>
          <option value="paypal">PayPal</option>
          <option value="bonifico">Bonifico</option>
        </select>
      </div>

      <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Register
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {getUsers, postUser} from "@/service/authApi.js"; // Import API function

const router = useRouter();

const form = ref({
  name: "",
  surname: "",
  email: "",
  password: "",
  date_of_birth: "",
  paymentMethod: "carta",
});

const registerUser = async () => {
  try {
    await postUser(form.value);
    alert("Registration successful!");
    const users = await getUsers();
      users.forEach(user => {
        if (form.value.email === user.email) {
          // Salviamo l'utente in localStorage (simulazione)
          localStorage.setItem("user",  user._id );
          router.push(`/${user._id}/profiles`); // Reindirizza alla selezione profili
        }
      })
  } catch (error) {
    console.error("Error registering user:", error);
    alert("Registration failed.");
  }
};
</script>
