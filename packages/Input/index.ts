import { App, Plugin } from "vue";
import Input from "./src/index.vue";

export const InputPlugin: Plugin = {
  install(app: App) {
    app.component("YcInput", Input);
  },
};

export { Input };
