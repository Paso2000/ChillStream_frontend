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

<script setup>
import Button from "@/views/components/Button.vue";
import FormInput from "@/views/components/FormInput.vue";
</script>