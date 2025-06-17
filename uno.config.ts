// uno.config.ts
import { defineConfig, presetIcons, transformerDirectives } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'
import presetWind3 from '@unocss/preset-wind3'
export default defineConfig({
  transformers: [transformerDirectives()],
  rules: [[/^fs-(\d+)$/, ([, d]) => ({ 'font-size': `${d}px` })]],
  theme: {
    // ...
    colors: {
      primary: '#BE2E79', // class="text-primary"
      gold: '#CB9D84', // class="text-gold"
    },
  },
  presets: [
    presetWind3({
      important: 'body',
    }),
    presetRemToPx({ baseFontSize: 4 }),
    presetIcons({
      /* options */
    }),
    // ...other presets
  ],
  shortcuts: [
    {
      'flex-center': 'flex justify-center items-center',
      'flex-between-center': 'flex justify-between items-center',
      full: 'h-full w-full',
    },
  ],
})
