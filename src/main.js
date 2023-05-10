import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less'
// import 'ant-design-vue/dist/antd.css';


// Nucleo Icons
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import "./assets/css/common.css";

import materialKit from "./material-kit";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Antd)
app.use(materialKit);
app.mount("#app");
