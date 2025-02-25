<template>
  <div class="login-container">
    <img src="/chillStream-logo.png" alt="Logo" class="logo" />
    <div class="login-box">
      <h2>Admin Sign In</h2>
      <FormInput v-model="username" type="username" placeholder="User"/>
      <FormInput v-model="password" type="password" placeholder="Password"/>
      <Button @click="handleLogin">Sign In</Button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {getAdminList} from "@/service/authApi.js";
import FormInput from "@/components/FormInput.vue";
import Button from "@/components/Button.vue";

const username = ref("GiammaIlControllore");
const password = ref("pastaConTonno");
const router = useRouter();

const handleLogin = async () => {
  let isFound = false;

  try {
    const admins = await getAdminList();
    const adminFound = admins.find(
        (admin) => username.value === admin.username && password.value === admin.password);
        if (adminFound) {
          isFound=true
          await router.push(`/admin/control-panel`);
        }

      } catch (error) {
        alert("connection error");
      }
  if (!isFound)
    alert("Wrong credential")
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
