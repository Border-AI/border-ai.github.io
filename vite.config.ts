import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import { cpSync, existsSync, rmSync } from "fs";

export default defineConfig({
  root: resolve(__dirname, "app/source/app-shell"),
  base: "/app/",
  publicDir: resolve(__dirname, "public"),
  build: {
    outDir: resolve(__dirname, "app/.build"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "assets/app.js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || "";
          if (name.endsWith(".css")) {
            return "assets/app.css";
          }
          return "assets/[name][extname]";
        },
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "app-route-pages",
      closeBundle() {
        const appDir = resolve(__dirname, "app");
        const buildDir = resolve(__dirname, "app/.build");
        const buildAssetsDir = resolve(buildDir, "assets");
        const appAssetsDir = resolve(appDir, "assets");

        if (existsSync(appAssetsDir)) {
          rmSync(appAssetsDir, { recursive: true, force: true });
        }

        cpSync(buildAssetsDir, appAssetsDir, { recursive: true });
        rmSync(buildDir, { recursive: true, force: true });
      },
    },
  ],
});
