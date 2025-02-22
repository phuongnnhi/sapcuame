"use client";

import { IconButton } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { LuMoon, LuSun } from "react-icons/lu";
import { useEffect, useState } from "react";

export function ColorModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component renders only after mounting (client-side)
  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // Avoid SSR mismatch

  const toggleColorMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <IconButton aria-label="toggle color mode" onClick={toggleColorMode}>
      {theme === "light" ? <LuMoon /> : <LuSun />}
    </IconButton>
  );
}
