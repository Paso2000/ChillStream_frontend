<template>
  <nav class="navbar">
    <div class="navbar-box">
      <Logo/>
        <!-- Sezioni della navbar -->
        <ul class="nav-links">
          <li @click="$emit('changeSection', 'contents')">CONTENTS MANAGEMENT</li>
          <li @click="$emit('changeSection', 'actors')">ACTORS MANAGEMENT</li>
          <li @click="$emit('changeSection', 'notifications')">SEND NOTIFICATIONS</li>
        </ul>
    </div>
  </nav>
</template>

<script>
import Logo from "@/components/Logo.vue";

export default {
  components: {Logo}
};
</script>

<style scoped>
/* Stile Navbar */
.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  color: white;
  width: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.2);
}

/* Box della navbar con sfondo traslucido */
.navbar-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 17px 20px;
  background: linear-gradient(135deg, #000000, #111);
  backdrop-filter: blur(15px);
}

/* Stile menu della navbar */
.nav-links {
  display: flex;
  list-style: none;
  gap: 25px;
}

.nav-links li {
  font-size: 16px; /* Testo più grande */
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.nav-links li:hover {
  color: #fff;
  transform: scale(1.1);
}
</style>
