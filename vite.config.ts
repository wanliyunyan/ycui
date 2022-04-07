import type { UserConfig, ConfigEnv } from "vite";
import { loadEnv } from "vite";
import { resolve } from "path";
import createProxy from "./build/vite/proxy";
import { wrapperEnv } from "./build/utils";
import createVitePlugins from "./build/vite/plugin";
import { OUTPUT_DIR } from "./build/vite/constant";

function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env);

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;

  const isBuild = command === "build";

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: [
        // /@/xxxx => src/xxxx
        {
          find: /@\//,
          replacement: `${pathResolve("src")}/`,
        },
      ],
    },
    server: {
      host: true,
      port: VITE_PORT, // 启动端口
      proxy: createProxy(VITE_PROXY),
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ["console.log", "debugger"] : [],
    },
    build: {
      target: "es2015",
      outDir: OUTPUT_DIR,
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
    define: {
      production: isBuild,
    },
    css: {
      preprocessorOptions: {
        less: {
          // 避免打包错误 Inline JavaScript is not enabled. Is it set in your options
          javascriptEnabled: true,
        },
      },
    },
    plugins: createVitePlugins(viteEnv, isBuild),

    optimizeDeps: {
      include: ["ant-design-vue/es/locale/zh_CN"],
    },
  };
};
