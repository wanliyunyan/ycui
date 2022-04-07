import { RouteRecordRaw } from "vue-router";
import RouterView from "@/components/routerView/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/dictionary",
    name: "dictionary",
    component: RouterView,
    children: [

    ],
  },
];

export default routes;
