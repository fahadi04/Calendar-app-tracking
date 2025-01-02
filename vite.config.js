import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src/api",
    },
  },
  build: {
    outDir: "../dist", // Specify output directory for production build
  },
});
