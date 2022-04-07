import { RouteRecordRaw } from "vue-router";
import { IAsyncRouteState } from "./state";

export const mutations = {
  setRouters: (state: IAsyncRouteState, routers: any): void => {
    // 设置动态路由
    state.menus = routers;
  },
  setKeepAliveComponents: (state: IAsyncRouteState, compNames: any): void => {
    // 设置需要缓存的组件
    state.keepAliveComponents = compNames;
  },
};
