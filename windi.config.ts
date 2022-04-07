import { defineConfig } from "vite-plugin-windicss";

export default defineConfig({
  attributify: true,
  extract: {
    include: ["src/**/*.{vue,html,jsx,tsx}"],
    exclude: ["node_modules", ".git"],
  },
});
