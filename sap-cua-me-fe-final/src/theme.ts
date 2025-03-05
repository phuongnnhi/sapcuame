// src/theme.ts
import { createSystem, defaultConfig } from "@chakra-ui/react";
import "@fontsource/eb-garamond/400.css";
import "@fontsource/eb-garamond/500.css";
import "@fontsource/eb-garamond/600.css";
import "@fontsource/eb-garamond/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

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
          "pastel": {value: "#D9C4EC80"},
          '700Alpha80': {value: "#9678B6CC"},
          '500Alpha80': {value: "#7C7495CC"},
          '500Alpha50': {value: "#7C749580"},
          '700Alpha50': {value: "#7C749580"}
        },
      },
      fonts: {
        heading: { value: `'EB Garamond', serif` },
        body: { value: `'Inter', sans-serif` },
      },
    },
  },
});

export default system;