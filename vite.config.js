import react from "@vitejs/plugin-react";
import path from "path";
import copy from "rollup-plugin-copy";
import { fileURLToPath } from "url";
import { defineConfig, normalizePath, loadEnv } from "vite";
import EnvironmentPlugin from 'vite-plugin-environment'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = loadEnv(process.env.NODE_ENV, __dirname, '')

const PORT = env.SERVER_PORT || 5000;
export default defineConfig({
  server: {
    proxy: {
      "/api": `http://localhost:${PORT}`,
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
    EnvironmentPlugin(['SDK_ID', 'ENDPOINT', 'PEM_FILE_PATH', 'BASE_URL']),
  ],
});
