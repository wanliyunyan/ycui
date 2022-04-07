// Image resource files used to compress the output of the production environment
// https://github.com/anncwb/vite-plugin-imagemin

import viteImagemin from "vite-plugin-imagemin";
import type { Plugin } from "vite";

export default function configImageminPlugin(): Plugin | Plugin[] {
  return viteImagemin({
    gifsicle: {
      optimizationLevel: 7,
      interlaced: false,
    },
    optipng: {
      optimizationLevel: 7,
    },
    mozjpeg: {
      quality: 8,
    },
    pngquant: {
      quality: [0.8, 0.9],
      speed: 4,
    },
    svgo: {
      plugins: [
        {
          name: "removeViewBox",
        },
        {
          name: "removeEmptyAttrs",
          active: false,
        },
      ],
    },
  });
}
