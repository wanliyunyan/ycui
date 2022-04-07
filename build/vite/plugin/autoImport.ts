/**
 *  Auto import APIs on-demand for Vite
 * https://github.com/antfu/unplugin-auto-import
 */
import type { Plugin } from "vite";
import AutoImport from "unplugin-auto-import/vite";

export default function configAutoImportPlugin(): Plugin | Plugin[] {
  return [
    AutoImport({
      dts: "src/types/auto-imports.d.ts", // 可以自定义文件生成的位置，默认是根目录下
      imports: ["vue", "vue-router", "vuex"],
      eslintrc: {
        enabled: true, // Default `false`
        filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
  ];
}
