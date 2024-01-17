import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  build: {
    outDir: "../docs/example",
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [react()],
});
