import { RouteRecordRaw } from "vue-router";
import { IAsyncRouteState } from "./state";

export const getters = {
  menus(state: IAsyncRouteState): RouteRecordRaw[] {
    return state.menus;
  },
};
