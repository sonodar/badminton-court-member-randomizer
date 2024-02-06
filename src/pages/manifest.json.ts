import type { APIRoute } from "astro";
import maskable from "@assets/pwa-512x512-maskable.png";
import rounded from "@assets/pwa-512x512-rounded.png";

export const GET: APIRoute = () => {
  return new Response(
    JSON.stringify({
      name: "ダブルスメンバー決めるくん",
      short_name: "ダブメンくん",
      description: "コートにダブルスメンバーをランダムで割り当てるアプリです",
      theme_color: "#89A6E2",
      background_color: "#E8EFF6",
      icons: [
        {
          purpose: "maskable",
          sizes: `${maskable.width}x${maskable.height}`,
          src: maskable.src,
          type: "image/png",
        },
        {
          purpose: "any",
          sizes: `${rounded.width}x${rounded.height}`,
          src: rounded.src,
          type: "image/png",
        },
      ],
      orientation: "portrait",
      display: "standalone",
      dir: "auto",
      lang: "ja",
      start_url: "https://badminton.sonodar.net",
      scope: "/",
    }),
  );
};
