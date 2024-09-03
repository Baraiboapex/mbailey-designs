import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./routes";

//Keep an eye on this. It probably won't work, FYI
createApp(App).use(router).mount('#app');
