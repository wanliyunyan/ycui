import App from "./App.vue";
import { setupStore } from "@/store";
import router, { setupRouter } from "./router";
import { setupUI } from "@/plugins";
// import MyKit from "../packages";

import "virtual:windi-base.css";
import "virtual:windi-components.css";
import "virtual:windi-utilities.css";

const app = createApp(App);
// 注册全局常用的ant-design-vue组件
setupUI(app);
// 挂载vuex状态管理
setupStore(app);
// 挂载路由
setupRouter(app);

router.isReady().then(() => app.mount("#app"));
// await router.isReady();
// app.mount("#app", true);
