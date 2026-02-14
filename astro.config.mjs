// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
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
