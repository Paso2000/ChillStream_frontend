<template>
  <div class="login-container">
    <img src="../../../public/chillStream-logo.png" alt="Logo" class="logo" />
    <div class="login-box">
      <h2>Admin Sign In</h2>
      <FormInput v-model="email" type="email" placeholder="Email"/>
      <FormInput v-model="password" type="password" placeholder="Password"/>
      <Button @click="login">Sign In</Button>
    </div>
  </div>
</template>

<script>
import FormInput from "@/views/components/FormInput.vue";
import Button from "@/views/components/Button.vue";

export default {
  components: { FormInput, Button },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      console.log("Email:", this.email, "Password:", this.password);
      // Qui puoi chiamare un'API per l'autenticazione
    },
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
