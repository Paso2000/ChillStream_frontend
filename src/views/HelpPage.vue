<template>
  <div class="help-page">
    <UserNavbar />
    <BackButton />
    <div class="help-content">
      <h1>Help Center</h1>
      <input type="text" placeholder="What do you need help with?" class="search-bar" />

      <div class="help-sections">
        <div class="section">
          <h2>Manage My Account</h2>
          <ul>
            <li>How do profiles work?</li>
            <li>How do I change my email?</li>
            <li>How do I update my password?</li>
          </ul>
        </div>

        <div class="section">
          <h2>Can't Watch</h2>
          <ul>
            <li>Why isn't the video loading?</li>
            <li>Audio or subtitle issues</li>
          </ul>
        </div>

        <div class="section">
          <h2>Quick Links</h2>
          <ul>
            <li>Update email</li>
            <li>Cancel account</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.help-page {
margin-top: 80px;
color: #fff;
background-color: #000;

}

.help-content {
padding: 20px;
max-width: 1000px;
margin: 0 auto;
}

.search-bar {
width: 100%;
padding: 10px 1px;
margin-bottom: 30px;
border-radius: 5px;
border: none;
}

.help-sections {
display: flex;
flex-wrap: wrap;
gap: 20px;
}

.section {
flex: 1 1 300px;
background-color: #1e1e1e;
padding: 20px;
border-radius: 10px;
}

.section h2 {
color: #8a2be2;
}

.section ul {
list-style: none;
padding: 0;
}

.section li {
margin-bottom: 10px;
cursor: pointer;
}

.section li:hover {
text-decoration: underline;
}
</style>
<script setup>
import UserNavbar from "@/components/UserNavbar.vue";
import BackButton from "@/components/BackButton.vue";
</script>