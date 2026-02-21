import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import { copyFileSync, mkdirSync } from "fs";

export default defineConfig({
  root: resolve(__dirname, "app-shell"),
  base: "/app/",
  publicDir: resolve(__dirname, "public"),
  build: {
    outDir: resolve(__dirname, "app"),
    emptyOutDir: true,
  },
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "app-route-pages",
      closeBundle() {
        const outDir = resolve(__dirname, "app");
        const rootIndex = resolve(outDir, "index.html");
        const routes = ["signup", "login", "eligibilitycheck", "dashboard"];

        routes.forEach((route) => {
          const routeDir = resolve(outDir, route);
          mkdirSync(routeDir, { recursive: true });
          copyFileSync(rootIndex, resolve(routeDir, "index.html"));
        });
      },
    },
  ],
});
