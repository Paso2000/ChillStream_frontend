<template>
  <nav class="navbar">
    <div class="logo">
      <img src="/chillStream-logo.png" alt="ChillStream Logo" />
    </div>
    <ul class="menu">
      <li>Home</li>
      <li>TV Shows</li>
      <li>Movies</li>
      <li>New & Popular</li>
      <li>My List</li>
    </ul>
    <div class="icons">
      <i class="fas fa-search"></i>
      <i class="fas fa-bell"></i>
      <img src="/profile1.png" class="profile-icon" />
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 50px;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
}

.logo img {
  height: 40px;
}

.menu {
  display: flex;
  gap: 20px;
  list-style: none;
  color: white;
}

.icons {
  display: flex;
  align-items: center;
  gap: 15px;
  color: white;
}

.profile-icon {
  height: 35px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
