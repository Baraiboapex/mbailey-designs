import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from "./routes";

const app = createApp(App);

//Keep an eye on this. It probably won't work, FYI
app.use(router);
app.mount('#app');
