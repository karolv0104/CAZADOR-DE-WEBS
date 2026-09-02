"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "corex91_cart";

function makeItemId(slug, weight) {
  return `${slug}::${weight}`;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore malformed/unavailable storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addToCart = useCallback((product, variant, quantity = 1) => {
    const id = makeItemId(product.slug, variant.weight);
    setItems((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [
        ...prev,
        {
          id,
          slug: product.slug,
          name: product.name,
          lot: product.lot,
          weight: variant.weight,
          price: variant.price,
          quantity,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id, qty) => {
    setItems((prev) => {
      if (qty <= 0) return prev.filter((item) => item.id !== id);
      return prev.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item,
      );
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const getCartTotal = useCallback(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      itemCount,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }),
    [
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      itemCount,
      isOpen,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
