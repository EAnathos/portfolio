// @ts-check
import { defineConfig } from "astro/config";
import node from "@astrojs/node";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://anathos.me",
  output: "server",
  adapter: node({ mode: "standalone" }),
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ["anathos.me"],
    },
    preview: {
      allowedHosts: ["anathos.me"],
    },
  },
});
