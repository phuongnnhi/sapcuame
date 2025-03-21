"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { getCart } from "@/app/apiFunctions";
import type { ProductCart } from "@/types";

interface CartContextState {
  cart: ProductCart[] | null;
  setCart: React.Dispatch<React.SetStateAction<ProductCart[] | null>>;
  refreshCart: () => Promise<void>;
}

interface CartProviderProps {
  children: React.ReactNode;
}

const CartContext = createContext<CartContextState | undefined>(undefined);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<ProductCart[] | null>(null);

  const refreshCart = async () => {
    try {
      const fetchedCart = await getCart();
      setCart(fetchedCart?.productCarts || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
      // If 401 occurs, user is not logged in or token is invalid
      setCart([]);
    }
  };

  useEffect(() => {
    // Safely check for window before using localStorage (especially in Next.js)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        // If token exists, fetch cart
        refreshCart();
      } else {
        // No token means user is not logged in, so cart is empty
        setCart([]);
      }
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};