"use client";

import { X, Plus, Minus, Trash2, MessageCircle } from "lucide-react";
import VialGraphic from "./VialGraphic";
import { useCart } from "@/lib/cart-context";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

function buildOrderMessage(items, total) {
  const lines = items.map(
    (item) =>
      `- ${item.name} ${item.weight} x${item.quantity} — $${(
        item.price * item.quantity
      ).toFixed(2)}`,
  );

  return [
    "Hi! I'd like to place this order at Corex 91:",
    "",
    lines.join("\n"),
    "",
    `Total: $${total.toFixed(2)}`,
    "",
    "Order placed from corex91.com — Product for laboratory research.",
  ].join("\n");
}

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
  } = useCart();

  const total = getCartTotal();

  function handleCheckout() {
    const message = buildOrderMessage(items, total);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message,
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-ink/50"
        onClick={closeCart}
        aria-hidden="true"
      />

      <div className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-surface px-5 py-4">
          <h2 className="font-display text-lg font-bold text-primary">
            Your cart
          </h2>
          <button
            type="button"
            onClick={closeCart}
            className="text-muted hover:text-ink"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="mt-10 text-center text-sm text-muted">
              Your cart is empty.
            </p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 border-b border-surface pb-4">
                  <VialGraphic
                    name={item.name}
                    weight={item.weight}
                    price={null}
                    lot={item.lot}
                    size={40}
                  />

                  <div className="flex-1">
                    <p className="font-display text-sm font-bold text-ink">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted">{item.weight}</p>

                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-md border border-surface">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="flex h-6 w-6 items-center justify-center text-muted hover:text-primary"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="min-w-[1.25rem] text-center text-xs font-semibold text-ink">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="flex h-6 w-6 items-center justify-center text-muted hover:text-primary"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-cyan">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="h-fit text-faint hover:text-red-500"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-surface px-5 py-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-ink">Total</span>
              <span className="font-display text-xl font-bold text-primary">
                ${total.toFixed(2)}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <MessageCircle size={18} />
              Checkout via WhatsApp
            </button>

            <button
              type="button"
              onClick={clearCart}
              className="mt-2 w-full rounded-md py-2 text-xs font-medium text-muted hover:text-red-500"
            >
              Clear cart
            </button>

            <p className="mt-3 text-[10px] leading-snug text-faint">
              For laboratory research use only. Not for human consumption.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
