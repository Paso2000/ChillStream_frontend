import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/views/LoginPage.vue";
import ProfileSelectionPage from "@/views/ProfileSelectionPage.vue";
import RegisterPage from "@/views/RegisterPage.vue";
import StartingPage from "@/views/StartingPage.vue";
import createProfilePage from "@/views/createProfilePage.vue";
import HomePage from "@/views/HomePage.vue";

const routes = [
    {
        path: "/Home",
        name: "HomePage",
        component: HomePage,
    },
    {
        path: "/createProfile",
        name: "createProfilePage",
        component: createProfilePage,
    },
    {
        path: "/",
        name: "StartingPage",
        component: StartingPage,
    },
    {
        path: "/Login",
        name: "Login",
        component: LoginPage,
    },
    {
        path: "/Register",
        name: "Register",
        component: RegisterPage,
    },
    {
        path: `/profiles`,
        name: "ProfileSelection",
        component: ProfileSelectionPage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;