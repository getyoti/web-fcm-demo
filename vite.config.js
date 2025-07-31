import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import react from "@vitejs/plugin-react";
import copy from "rollup-plugin-copy";
import { defineConfig, normalizePath, loadEnv } from "vite";
import EnvironmentPlugin from "vite-plugin-environment";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = loadEnv(process.env.NODE_ENV, __dirname, "");

const PORT = env.SERVER_PORT;
if (!PORT) {
  throw new Error("SERVER_PORT environment variable is not set.");
}
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: `https://localhost:${PORT}`,
        secure: false, // Accept self-signed certificate
        changeOrigin: true,
      },
    },
    https: {
      key: fs.readFileSync(path.join(__dirname, "ssl", "key.pem")),
      cert: fs.readFileSync(path.join(__dirname, "ssl", "cert.pem")),
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
              "./node_modules/@getyoti/react-face-capture/assets/*",
            ),
          ),
          dest: normalizePath(path.resolve(__dirname, "./public/assets")),
        },
      ],
      hook: "buildStart",
    }),
    EnvironmentPlugin(["SDK_ID", "ENDPOINT", "PEM_FILE_PATH", "BASE_URL"]),
  ],
});
