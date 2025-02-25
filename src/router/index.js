import { createRouter, createWebHistory } from "vue-router";
<<<<<<< HEAD
import LoginPage from "@/views/authentication/LoginPage.vue";
import ProfileSelectionPage from "@/views/authentication/ProfileSelectionPage.vue";
import RegisterPage from "@/views/authentication/RegisterPage.vue";
import StartingPage from "@/views/authentication/StartingPage.vue";
import createProfilePage from "@/views/authentication/CreateProfilePage.vue";
import HomePage from "@/views/HomePage.vue";
import AdminLoginPage from "@/views/admin/AdminLoginPage.vue";
import ControlPanelPage from "@/views/admin/controlPanelPage.vue";
import FilmDetailsPage from "@/views/FilmDetailsPage.vue";


const routes = [
    {
        path: "/Film",
        name: "FilmDetailsPage",
        component: FilmDetailsPage,
    },
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
    {
        path: '/admin',
        name: "AdminLogin",
        component: AdminLoginPage,
    },
    {
        path: '/admin/control-panel',
        name: "ControlPanel",
        component: ControlPanelPage,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;