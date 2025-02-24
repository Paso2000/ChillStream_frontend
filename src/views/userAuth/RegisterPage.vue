<template>

  <div class="login-container">
    <img src="/chillStream-logo.png" alt="Logo" class="logo"/>
    <div class="login-box">
      <h2>Register new account</h2>
      <FormInput v-model="form.name" type="name" placeholder="Name" required/>
      <FormInput v-model="form.surname" type="surname" placeholder="Surname" required/>
      <FormInput v-model="form.email" type="email" placeholder="Email" required/>
      <FormInput v-model="form.password" type="password" placeholder="Password" required/>
      <input v-model="form.date_of_birth" type="date" class="w-full p-2 border rounded" required/>
      <div class="mb-4">
        <label class="block text-sm font-medium">Payment Method</label>
        <select v-model="form.paymentMethod" class="w-full p-2 border rounded">
          <option value="carta">Carta</option>
          <option value="paypal">PayPal</option>
          <option value="bonifico">Bonifico</option>
        </select>
        <Button @click="registerUser">Sign Up</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {getUsers, postUser} from "@/service/authApi.js";
import FormInput from "@/components/FormInput.vue";
import Button from "@/components/Button.vue"; // Import API function

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
  console.log("Dati inviati al server:", form.value);
  try {
    const user = await postUser(form.value);
    alert("Registration successful!");
    localStorage.setItem("user", user._id);
    await router.push(`/profiles`); // Reindirizza alla selezione profili
  } catch (error) {
    console.error("Error registering user:", error);
    alert("Registration failed.");
  }
};
</script>


<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("/background.jpg");
  position: relative;
}

.login-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}

.logo {
  position: absolute;
  top: 20px;
  left: 20px;
  height: 120px;
  transition: transform 0.3s ease-in-out;
}

.login-box {
  background: rgba(43, 43, 43, 0.2);
  padding: 40px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.1);
  width: 300px;
  border: 2px solid #6a0dad;
  backdrop-filter: blur(10px);
}

h2 {
  color: white;
  margin-bottom: 20px;
}
</style>

