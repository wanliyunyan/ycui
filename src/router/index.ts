import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import { App } from "vue";
import { createRouterGuards } from "./router-guards";

import shared from "./modules/shared";
import common from "@/router/common";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Layout",
    component: () => import("@/layout/index.vue"),
    children: [...common],
  },
  ...shared,
];

// console.log("routes", routes);

const router = createRouter({
  // process.env.BASE_URL
  history: createWebHashHistory(),
  routes,
});

export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router);
}
export default router;
