/**
 * Plugin to minimize and use ejs template syntax in index.html.
 * https://github.com/anncwb/vite-plugin-html
 */
import type { PluginOption } from "vite";

import { createHtmlPlugin } from "vite-plugin-html";

import pkg from "../../../package.json";
import { GLOB_CONFIG_FILE_NAME } from "../constant";

export default function configHtmlPlugin(env: ViteEnv, isBuild: boolean): PluginOption[] {
  const { VITE_GLOB_APP_TITLE, VITE_PUBLIC_PATH } = env;

  // const path = VITE_PUBLIC_PATH.endsWith("/") ? VITE_PUBLIC_PATH : `${VITE_PUBLIC_PATH}/`;

  // const getAppConfigSrc = () => {
  //   return `${path || "/"}${GLOB_CONFIG_FILE_NAME}?v=${pkg.version}-${new Date().getTime()}`;
  // };

  return createHtmlPlugin({
    minify: isBuild,
    inject: {
      data: {
        title: VITE_GLOB_APP_TITLE,
      },
    },
  });
}
