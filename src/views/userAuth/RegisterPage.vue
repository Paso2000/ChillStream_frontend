<template>
  <div class="navbar">
    <Logo/>
  </div>

  <div class="login-container">
    <div class="login-box">
      <h2>New account</h2>
      <FormInput v-model="form.name" type="name" placeholder="Name" required/>
      <FormInput v-model="form.surname" type="surname" placeholder="Surname" required/>
      <FormInput v-model="form.email" type="email" placeholder="Email" required/>
      <FormInput v-model="form.password" type="password" placeholder="Password" required/>
      <input v-model="form.date_of_birth" type="date" class="dataForm" required/>
      <div class="mb-4">
        <select v-model="form.paymentMethod" class="dataForm">
          <option value="card">Card</option>
          <option value="paypal">PayPal</option>
          <option value="transfer">Transfer</option>
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
import Button from "@/components/Button.vue";
import Logo from "@/components/Logo.vue"; // Import API function

const router = useRouter();

const form = ref({
  name: "",
  surname: "",
  email: "",
  password: "",
  date_of_birth: "",
  paymentMethod: "card",
});

const registerUser = async () => {
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

.dataForm{
  width: 100%;
  font-family: "Arial", sans-serif;
  max-width: 300px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  margin-bottom: 10px;
  background: #d3d3d3;
  outline: none;
  box-sizing: border-box;
}
</style>

