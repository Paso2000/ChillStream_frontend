<template>
  <div class="navbar">
    <Logo/>
  </div>
  <div class="login-container">
    <div class="login-box">
      <h2>Sign In</h2>
      <FormInput v-model="form.email" type="email" placeholder="Email" required/>
      <FormInput v-model="form.password" type="password" placeholder="Password" required/>
      <Button @click="handleLogin">Sign In</Button>
      <p class="signup-text">
        New to Chill Stream? <span class="signup-link" @click="goToRegister">Sign up now.</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {canUserLogIn, getUsers} from "@/service/authApi.js";
import FormInput from "@/components/FormInput.vue";
import Button from "@/components/Button.vue";
import Logo from "@/components/Logo.vue";

const form = ref({
  email:"",
  password:""
});
const router = useRouter();

const handleLogin = async () =>
    {
      try{
        const userFound = await canUserLogIn(form.value)
        if(userFound){
          sessionStorage.setItem("user", userFound._id);
          router.push(`/profiles`);
        }
      }catch (error){
        alert("wrong credential")
      }


    }
;

const goToRegister = () => {
  router.push("/register");
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("/background.jpg") center/cover no-repeat;
  position: relative;
}

/* Overlay */
.login-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1;
}

.navbar {
  position: absolute;
  top: 20px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: left;
  padding: 0;
  z-index: 10;
}

.login-box {
  background: rgba(43, 43, 43, 0.6);
  padding: 40px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.1);
  width: 320px;
  border: 2px solid #6a0dad;
  backdrop-filter: blur(10px);
  z-index: 10;
}

h2 {
  color: white;
  margin-bottom: 20px;
}

.signup-text {
  color: white;
  margin-top: 15px;
  font-size: 14px;
}

.signup-link {
  color: red;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
}

.signup-link:hover {
  text-decoration: underline;
}
</style>
