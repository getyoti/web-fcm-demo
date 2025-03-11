import react from "@vitejs/plugin-react";
import path from "path";
import copy from "rollup-plugin-copy";
import { fileURLToPath } from "url";
import { defineConfig, normalizePath } from "vite";
import EnvironmentPlugin from 'vite-plugin-environment'

const SERVER_PORT_FALLBACK = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  server: {
    proxy: {
      "/api": `http://localhost:${process.env.SERVER_PORT || SERVER_PORT_FALLBACK}`,
    },
  },
  plugins: [
    react(),
    copy({
      targets: [
        {
          src: normalizePath(
            path.resolve(
              __dirname,
              "./node_modules/@getyoti/react-face-capture/assets/*"
            )
          ),

          dest: normalizePath(path.resolve(__dirname, "./public/assets")),
        },
      ],
      hook: "buildStart",
    }),
    EnvironmentPlugin(['SDK_ID', 'ENDPOINT', 'PEM_FILE_PATH', 'BASE_URL', 'SERVER_PORT']),
  ],
});
