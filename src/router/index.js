import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/views/LoginPage.vue";
import ProfileSelectionPage from "@/views/ProfileSelectionPage.vue";
import RegisterPage from "@/views/RegisterPage.vue";
import StartingPage from "@/views/StartingPage.vue";

const routes = [
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
        path: `/:userId/profiles`,
        name: "ProfileSelection",
        component: ProfileSelectionPage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;