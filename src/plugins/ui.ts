import type { App } from "vue";
// vite只能用 ant-design-vue/es 而非 ant-design-vue/lib
import "ant-design-vue/es/message/style/css";
import "ant-design-vue/es/modal/style/css";

export default function setupUI(app: App<Element>): boolean {
  return true;
}
