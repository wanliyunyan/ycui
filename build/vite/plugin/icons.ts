/**
 *  Access thousands of icons as components on-demand universally.
 * https://github.com/antfu/unplugin-icons
 */
import type { Plugin } from "vite";
import Icons from "unplugin-icons/vite";

export default function configIconPlugin(): Plugin | Plugin[] {
  return [
    Icons({
      compiler: "vue3",
      // expiremental
      autoInstall: true,
    }),
  ];
}
