import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  root: resolve(__dirname, "app-shell"),
  base: "/app/",
  publicDir: resolve(__dirname, "public"),
  build: {
    outDir: resolve(__dirname, "app"),
    emptyOutDir: true,
  },
  plugins: [react(), tailwindcss()],
});
