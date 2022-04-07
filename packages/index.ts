import { App, Plugin } from "vue";
import { ButtonPlugin } from "./Button";
import { InputPlugin } from "./Input";

const MyKitPlugin: Plugin = {
  install(app: App) {
    ButtonPlugin.install?.(app);
    InputPlugin.install?.(app);
  },
};

export default MyKitPlugin;

export * from "./Button";
export * from "./Input";
