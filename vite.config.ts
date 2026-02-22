import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import { copyFileSync, cpSync, existsSync, mkdirSync, rmSync } from "fs";

export default defineConfig({
  root: resolve(__dirname, "app/source/app-shell"),
  base: "/app/",
  publicDir: resolve(__dirname, "public"),
  build: {
    outDir: resolve(__dirname, "app/.build"),
    emptyOutDir: true,
  },
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "app-route-pages",
      closeBundle() {
        const appDir = resolve(__dirname, "app");
        const buildDir = resolve(__dirname, "app/.build");
        const rootIndex = resolve(buildDir, "index.html");
        const buildAssetsDir = resolve(buildDir, "assets");
        const appAssetsDir = resolve(appDir, "assets");
        const routes = ["signup", "login", "eligibilitycheck", "dashboard"];

        if (existsSync(appAssetsDir)) {
          rmSync(appAssetsDir, { recursive: true, force: true });
        }

        cpSync(buildAssetsDir, appAssetsDir, { recursive: true });
        copyFileSync(rootIndex, resolve(appDir, "index.html"));

        routes.forEach((route) => {
          const routeDir = resolve(appDir, route);
          mkdirSync(routeDir, { recursive: true });
          copyFileSync(resolve(appDir, "index.html"), resolve(routeDir, "index.html"));
        });

        rmSync(buildDir, { recursive: true, force: true });
      },
    },
  ],
});
