<template>
  <div class="login-container">
    <img src="../../../public/chillStream-logo.png" alt="Logo" class="logo" />
    <div class="login-box">
      <h2>Admin Sign In</h2>
      <FormInput v-model="email" type="email" placeholder="Email"/>
      <FormInput v-model="password" type="password" placeholder="Password"/>
      <Button @click="handleLogin">Sign In</Button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getUsers } from "@/service/authApi.js";
import FormInput from "@/views/components/FormInput.vue";
import Button from "@/views/components/Button.vue";

export default {
  components: { FormInput, Button },
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();

    const handleLogin = async () => {
      try {
        const users = await getUsers();
        const userFound = users.find(
            (user) => email.value === user.email && password.value === user.password
        );

        if (userFound) {
          localStorage.setItem("user", userFound._id);
          await router.push("/control-panel");
        } else {
          alert("Wrong credentials, try it again");
        }
      } catch (error) {
        alert("connection error");
      }
    };

    return { email, password, handleLogin };
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1e1e1e;
}
.logo {
  position: absolute;
  top: 20px;
  left: 20px;
  height: 100px;
}

.login-box {
  background: #2b2b2b;
  padding: 40px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
  width: 300px;
  border: 2px solid #6a0dad;
}

h2 {
  color: white;
  margin-bottom: 20px;
}
</style>
