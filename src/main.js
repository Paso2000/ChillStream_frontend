import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"; // Importa il router


const app = createApp(App);


app.use(router);

// ✅ Monta l'app nell'elemento HTML con id "app"
app.mount("#app");
