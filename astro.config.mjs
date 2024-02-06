import node from "@astrojs/node";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),
  integrations: [react()],
  vite: {
    ssr: {
      noExternal: [
        "@astrojs/node",
        "@astrojs/react",
        "@chakra-ui/icons",
        "@chakra-ui/react",
        "@dnd-kit/core",
        "@emotion/react",
        "@emotion/styled",
        "astro",
        "aws-amplify",
        "framer-motion",
        "jotai",
        "ms",
        "react",
        "react-dom",
        "react-icons",
        "ts-pattern",
        "typescript",
        "zod",
      ],
    },
    define: {
      "window.global": {},
    },
  },
});
