<template>
  <nav class="navbar">
    <div class="navbar-box">
      <!-- Logo -->
      <div class="logo">
        <img src="/chillStream-logo.png" alt="ChillStream Logo" />
      </div>

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
export default {};
</script>

<style scoped>
/* Stile Navbar */
.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  //background: url("/background.jpg") no-repeat center center/cover;
  color: white;
  font-family: "Arial", sans-serif;
  width: 100%;
}

/* Box della navbar con sfondo traslucido */
.navbar-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  //background: rgba(106, 13, 173, 0.7);
  padding: 15px 10px;
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
}

/* Stile del logo */
.logo {
  display: flex;
  align-items: center;
}

.logo img {
  height: 70px;
  margin-right: 10px;
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
