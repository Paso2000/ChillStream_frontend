<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Admin Sign In</h2>
      <FormInput v-model="username" type="username" placeholder="User"/>
      <FormInput v-model="password" type="password" placeholder="Password"/>
      <Button @click="handleLogin">Sign In</Button>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {getAdminList} from "@/service/authApi.js";
import FormInput from "@/components/FormInput.vue";
import Button from "@/components/Button.vue";

const username = ref("admin");
const password = ref("admin");
const router = useRouter();

const handleLogin = async () => {

  try {
    const admins = await getAdminList();
    const adminFound = admins.find(
        (admin) => username.value === admin.username && password.value === admin.password);
    if (adminFound) {
      sessionStorage.setItem("admin", username.value)
      await router.push(`/admin/control-panel`);
    } else {
      alert("Wrong credential")
    }
  } catch (error) {
    alert("Connection error");
  }
};

</script>

<style scoped>
.login-container {
  margin-top: 80px;
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
