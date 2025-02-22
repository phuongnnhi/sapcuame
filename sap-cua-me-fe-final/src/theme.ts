// src/theme.ts
import { createSystem, defaultConfig } from "@chakra-ui/react";

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#FCF6FF" },
          100: { value: "#D9D9D9" },
          300: { value: "#F0F0F0" },
          500: { value: "#7C7495" },
          700: { value: "#9678B6" },
          '700Alpha80': {value: "#9678B6CC"},
          '500Alpha80': {value: "#7C7495CC"}
        },
      },
      fonts: {
        heading: { value: `'Merriweather', serif` },
        body: { value: `'Inter', sans-serif` },
      },
    },
  },
});

export default system;