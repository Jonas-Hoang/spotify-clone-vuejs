import { createApp } from "vue";
import { createPinia } from "pinia";
import LenisVue from "lenis/vue";

// @ts-ignore
import App from "./App.vue";
import router from "./router";

import "./assets/main.scss";

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import Tres from "@tresjs/core";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app.use(LenisVue);
app.use(pinia);
app.use(router);
app.use(Tres);

app.mount("#app");