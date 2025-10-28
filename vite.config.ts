import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import stylelint from "vite-plugin-stylelint";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@layout": path.resolve(__dirname, "./src/components/layout"),
      "@ui": path.resolve(__dirname, "./src/components/ui"),
      "@form": path.resolve(__dirname, "./src/components/form"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@router": path.resolve(__dirname, "./src/router"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@pages": path.resolve(__dirname, "./src/pages"),
    },
  },
  plugins: [react(), stylelint({ include: ["src/**/*.css"], cache: true })],
});
