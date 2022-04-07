/**
 * On-demand components auto importing for Vue.
 * https://github.com/antfu/unplugin-vue-components
 */
import type { Plugin } from "vite";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

export default function configVueComponentsPlugin(): Plugin | Plugin[] {
  const plugin = Components({
    dts: true, // enabled by default if `typescript` is installed
    resolvers: [AntDesignVueResolver()],
  });

  return plugin;
}
