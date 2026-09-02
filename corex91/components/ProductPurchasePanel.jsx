"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";

export default function ProductPurchasePanel({ product }) {
  const { addToCart } = useCart();
  const hasMultipleVariants = product.variants.length > 1;
  const [selectedWeight, setSelectedWeight] = useState(
    hasMultipleVariants ? null : product.variants[0].weight,
  );
  const [added, setAdded] = useState(false);

  const selectedVariant =
    product.variants.find((v) => v.weight === selectedWeight) || null;

  function handleAdd() {
    if (!selectedVariant) return;
    addToCart(product, selectedVariant, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div>
      <div className="flex items-baseline gap-3">
        <span className="text-2xl font-bold text-cyan">
          {selectedVariant
            ? `$${selectedVariant.price.toFixed(2)}`
            : "Select a weight"}
        </span>
      </div>

      {hasMultipleVariants && (
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            Weight
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.variants.map((variant) => {
              const active = variant.weight === selectedWeight;
              return (
                <button
                  key={variant.weight}
                  type="button"
                  onClick={() => setSelectedWeight(variant.weight)}
                  className={`rounded-md border px-4 py-2 text-sm font-semibold transition-colors ${
                    active
                      ? "border-primary bg-primary text-white"
                      : "border-surface text-ink hover:border-primary"
                  }`}
                >
                  {variant.weight}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={handleAdd}
        disabled={!selectedVariant}
        className="mt-6 w-full rounded-md bg-primary py-3 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
      >
        {added ? "Added to cart!" : "Add to cart"}
      </button>

      {hasMultipleVariants && !selectedVariant && (
        <p className="mt-2 text-xs text-muted">
          Choose a weight to add it to your cart.
        </p>
      )}
    </div>
  );
}
