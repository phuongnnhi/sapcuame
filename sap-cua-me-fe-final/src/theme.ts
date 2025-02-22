// src/theme.ts
import { createSystem, defaultConfig } from "@chakra-ui/react";

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#F5E6DA" },
          100: { value: "#D9D9D9" },
          300: { value: "#F0F0F0" },
          500: { value: "#D9915B" },
          700: { value: "#5C4033" },
          '700Alpha80': {value: "#5C4033CC"}
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