<template>
  <img
      src="/chillStream-logo.png"
      alt="ChillStream Logo"
      class="logo"
      :class="{ 'clickable': !isAdmin }"
      @click="goHome"
  />
</template>

<script setup>
import {useRouter, useRoute} from "vue-router";

const router = useRouter();
const route = useRoute();
const isAdmin = route.path.startsWith("/admin");

const goHome = () => {
  if (!isAdmin) {
    router.push("/home");
  }
};
</script>

<style scoped>
.logo {
  height: 40px;
  transition: transform 0.3s ease-in-out;
  margin-left: 20px;
}

.clickable {
  cursor: pointer;
}

</style>
