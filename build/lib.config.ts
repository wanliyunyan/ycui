import type { UserConfig, ConfigEnv, Plugin, PluginOption } from "vite";
import { resolve } from "path";

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import windiCSS from "vite-plugin-windicss";
import vueSetupExtend from "vite-plugin-vue-setup-extend";
import dts from "vite-plugin-dts";
import configVueComponentsPlugin from "./vite/plugin/vueComponents";
import configAutoImportPlugin from "./vite/plugin/autoImport";
import configIconPlugin from "./vite/plugin/icons";

export default ({ command, mode }: ConfigEnv): UserConfig => {
  return {
    build: {
      outDir: "dist",
      lib: {
        entry: resolve(__dirname, "../packages/index.ts"),
        name: "yc",
        formats: ["es"],
        fileName: "index",
      },
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: ["vue"],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: "Vue",
          },
        },
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      vueSetupExtend(),
      windiCSS(),
      configIconPlugin(),
      configVueComponentsPlugin(),
      configAutoImportPlugin(),
      dts({
        copyDtsFiles: false,
        outputDir: "types",
        // insertTypesEntry: true,
        // skipDiagnostics: false,
        // logDiagnostics: true,
      }),
    ],

    optimizeDeps: {
      include: ["ant-design-vue/es/locale/zh_CN"],
    },
  };
};
