import { createApp } from "vue";
import App from "./First.vue";
import router from "./router";

const app = createApp(App);
app.use(router);
app.mount('#screen');
