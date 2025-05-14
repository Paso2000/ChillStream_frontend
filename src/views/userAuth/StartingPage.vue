<template>
  <div class="navbar">
    <div class="logo-container">
      <Logo/>
    </div>
    <Button class="sign-in-btn" @click="goToLogin">Sign In</Button>
  </div>
  <div class="login-container">
    <div class="content">
      <h1>Unlimited movies, TV shows, and more</h1>
      <p class="sub-text">Ready to watch? Enter your email to create or restart your membership.</p>
      <Button @click="goToRegister">Get Started ➤</Button>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import Button from "@/components/Button.vue";
import Logo from "@/components/Logo.vue";

const router = useRouter();

const goToLogin = () => {
  router.push("/login");
};

const goToRegister = () => {
  router.push("/register");
};
</script>

<style scoped>
.navbar {
  position: absolute;
  top: 20px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0;
  z-index: 10;
}

.logo-container {
  display: none;
}

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

.sign-in-btn {
  max-width: 120px;
  margin-right: 10px;
}

@media (min-width: 769px) {
  .navbar {
    justify-content: space-between;
    margin-top: -5px;
  }

  .logo-container {
    display: block;

  }

  .sign-in-btn {
    max-width: 150px;
    margin-right: 100px;
  }
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
