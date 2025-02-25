<template>
  <div class="login-container">
    <!-- Navbar -->
    <div class="navbar">
      <Logo/>
      <Button class="sign-in-btn" @click="goToLogin">Sign In</Button>
    </div>

    <!-- Contenuto centrale -->
    <div class="content">
      <h1>Unlimited movies, TV shows, and more</h1>
      <p class="sub-text">Ready to watch? Enter your email to create or restart your membership.</p>
        <Button @click="goToRegister">Get Started ➤</Button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Button from "@/components/Button.vue";
import Logo from "@/components/Logo.vue";

const router = useRouter();
const email = ref("");

const goToLogin = () => {
  router.push("/login");
};

const goToRegister = () => {
  router.push("/register");
};
</script>

<style scoped>

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url("/background.jpg") center/cover no-repeat;
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
}

.sign-in-btn {
  max-width: 150px;
  margin-right: 100px;
}

.content {
  text-align: center;
  color: white;
  z-index: 2;
  max-width: 600px;
}

h1 {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 10px;
}

p {
  font-size: 1.2rem;
}

.sub-text {
  font-size: 1rem;
  margin-top: 20px;
}
</style>
