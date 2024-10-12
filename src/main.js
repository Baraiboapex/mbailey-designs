import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from "./routes";

const app = createApp(App);

//Keep an eye on this. It probably won't work, FYI
//UPDATE: the aboout page is having issue with loading on the first page visit. It will
//then load correctly if the browser is refreshed though. Please look into this!!
app.use(router);
app.mount('#app');
