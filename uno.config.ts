// uno.config.ts
import { defineConfig, presetIcons } from "unocss";
import { presetUno, transformerDirectives } from "unocss";
import presetRemToPx from "@unocss/preset-rem-to-px";

export default defineConfig({
  transformers: [transformerDirectives()],
  theme: {
    // ...
    colors: {
      primary: "#BE2E79", // class="text-primary"
      gold: "#CB9D84", // class="text-gold"
    },
  },
  presets: [
    presetUno(),
    presetRemToPx({ baseFontSize: 4 }),
    presetIcons({
      /* options */
    }),
    // ...other presets
  ],
});
