"use client";

import type { HTMLChakraProps, RecipeProps } from "@chakra-ui/react";
import { createRecipeContext } from "@chakra-ui/react";

const { withContext } = createRecipeContext({ key: "button" });

//  Directly use HTMLChakraProps<"a", RecipeProps<"button">> without an empty interface
export const LinkButton = withContext<
  HTMLAnchorElement,
  HTMLChakraProps<"a", RecipeProps<"button">>
>("a");
