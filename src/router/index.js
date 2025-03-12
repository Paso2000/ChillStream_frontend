import {createRouter, createWebHistory} from "vue-router";
import LoginPage from "@/views/userAuth/LoginPage.vue";
import ProfileSelectionPage from "@/views/userAuth/ProfileSelectionPage.vue";
import RegisterPage from "@/views/userAuth/RegisterPage.vue";
import StartingPage from "@/views/userAuth/StartingPage.vue";
import createProfilePage from "@/views/userAuth/CreateProfilePage.vue";
import HomePage from "@/views/HomePage.vue";
import AdminLoginPage from "@/views/admin/AdminLoginPage.vue";
import ControlPanelPage from "@/views/admin/controlPanelPage.vue";
import FilmDetailsPage from "@/views/FilmDetailsPage.vue";
import ProfileSettingsPage from "@/views/ProfileSettingsPage.vue";
import LiveFilm from "@/views/LiveFilm.vue";
import ActorDetails from "@/views/ActorDetails.vue";
import NotificationPage from "@/views/NotificationPage.vue";
import HelpPage from "@/views/HelpPage.vue";


const routes = [
    {path: "/ActorDetails", name: "ActorDetails", component: ActorDetails,},
    {path: "/ProfileSettings", name: "ProfileSettings", component: ProfileSettingsPage,},
    {path: "/Film", name: "FilmDetailsPage", component: FilmDetailsPage,},
    {path: "/Home", name: "HomePage", component: HomePage,},
    {path: "/createProfile", name: "createProfilePage", component: createProfilePage,},
    {path: "/", name: "StartingPage", component: StartingPage,},
    {path: "/Login", name: "Login", component: LoginPage,},
    {path: "/Register", name: "Register", component: RegisterPage,},
    {path: `/profiles`, name: "ProfileSelection", component: ProfileSelectionPage,},
    {path: '/admin', name: "AdminLogin", component: AdminLoginPage,},
    {path: '/admin/control-panel', name: "ControlPanel", component: ControlPanelPage,},
    {path: "/notification", name: "Notification", component: NotificationPage},
    {path: "/help", name: "Help", component: HelpPage},
    {path: "/live", name: "Live", component: LiveFilm, props: (route) => ({start: parseInt(route.query.start) || 0})}// Pass "start" as a  prop}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;