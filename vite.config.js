import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const config = defineConfig({
    server: {middlewareMode: true},
    appType: "custom",
    root: ".",
    plugins: [react(), tailwindcss()]
})

export default config;