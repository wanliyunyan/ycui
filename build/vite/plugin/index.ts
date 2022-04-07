import type { Plugin, PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import legacy from "@vitejs/plugin-legacy";
import windiCSS from "vite-plugin-windicss";
import vueSetupExtend from "vite-plugin-vue-setup-extend";
import configHtmlPlugin from "./html";
import configCompressPlugin from "./compress";
import configImageminPlugin from "./imagemin";
import configVueComponentsPlugin from "./vueComponents";
import configAutoImportPlugin from "./autoImport";
import configIconPlugin from "./icons";

export default function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    VITE_USE_IMAGEMIN,
    // VITE_USE_MOCK,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = viteEnv;

  const vitePlugins: (Plugin | Plugin[] | PluginOption[])[] = [
    // have to
    vue(),
    // have to
    vueJsx(),
    // support name
    vueSetupExtend(),
  ];

  // TODO 这个应该是用不上
  // !isBuild && vitePlugins.push(configHmrPlugin());

  // vite-plugin-windicss
  vitePlugins.push(windiCSS());

  // unplugin-icons
  vitePlugins.push(configIconPlugin());

  // @vitejs/plugin-legacy
  if (VITE_LEGACY && isBuild) {
    vitePlugins.push(legacy());
  }

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  // vite-plugin-svg-icons
  // vitePlugins.push(configSvgIconsPlugin(isBuild));

  // vite-plugin-windicss
  // vitePlugins.push(configWindiCssPlugin());

  // vite-plugin-mock
  // VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));

  // vite-plugin-purge-icons
  // vitePlugins.push(PurgeIcons());

  // rollup-plugin-visualizer
  // vitePlugins.push(configVisualizerConfig());

  // vite-plugin-theme
  // vitePlugins.push(configThemePlugin(isBuild));

  // vite-plugin-style-import
  // vitePlugins.push(configStyleImportPlugin());

  // unplugin-vue-components
  vitePlugins.push(configVueComponentsPlugin());

  // unplugin-auto-import/vite
  vitePlugins.push(configAutoImportPlugin());

  // The following plugins only work in the production environment
  if (isBuild) {
    // vite-plugin-imagemin
    if (VITE_USE_IMAGEMIN) {
      vitePlugins.push(configImageminPlugin());
    }

    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE)
    );

    // vite-plugin-pwa
    // vitePlugins.push(configPwaConfig(viteEnv));
  }

  return vitePlugins;
}
