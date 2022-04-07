import { createStore, useStore as baseUseStore, createLogger, Store } from "vuex";

import { App } from "vue";
import modules from "@/store/modules/index";
import { IStore } from "./types";



const store = createStore<IStore>({
  modules,
});

// 定义你自己的“useStore”组合函数
export function useStore(): Store<IStore> {
  return baseUseStore();
}

export function setupStore(app: App) {
  // app.use(store, key);
  app.use(store);
}

export default store;
