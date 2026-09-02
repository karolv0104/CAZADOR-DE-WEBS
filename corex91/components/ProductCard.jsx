import Link from "next/link";
import VialGraphic from "./VialGraphic";
import { getVariantPriceRange } from "@/lib/products";

export default function ProductCard({ product }) {
  const hasMultipleVariants = product.variants.length > 1;
  const { min } = getVariantPriceRange(product);
  const displayPrice = hasMultipleVariants
    ? `From $${min.toFixed(0)}`
    : `$${product.variants[0].price.toFixed(2)}`;
  const svgPriceLabel = hasMultipleVariants
    ? `From $${min.toFixed(0)}`
    : `$${product.variants[0].price.toFixed(0)}`;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col items-center rounded-lg border border-surface p-5 text-center transition-shadow hover:shadow-lg"
    >
      <VialGraphic
        name={product.name}
        weight={product.variants[0].weight}
        price={svgPriceLabel}
        lot={product.lot}
        size={84}
      />

      <p className="mt-3 font-display text-sm font-bold text-ink">
        {product.name}
      </p>
      <p className="mt-0.5 text-xs text-muted">{product.category}</p>

      <div className="mt-2 flex items-center gap-2">
        <span className="rounded-full bg-surface px-2 py-0.5 text-[10px] font-semibold text-primary">
          {product.purity}
        </span>
      </div>

      <p className="mt-2 text-base font-bold text-cyan">{displayPrice}</p>
    </Link>
  );
}
