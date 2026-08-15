import Link from "next/link";
import ProductLabel from "./ProductLabel";

export default function ProductCard({ product }) {
  const hasDiscount = product.priceOriginal > product.price;

  return (
    <Link
      href={`/productos/${product.slug}`}
      className="group block rounded-lg transition-shadow hover:shadow-lg"
    >
      <ProductLabel product={product} />

      <div className="mt-3 flex items-center justify-between px-1">
        <div className="flex items-baseline gap-2">
          {hasDiscount && (
            <span className="text-sm text-muted line-through">
              ${product.priceOriginal.toFixed(2)}
            </span>
          )}
          <span className="text-base font-bold text-cyan">
            {product.priceIsFrom && "From "}${product.price.toFixed(2)}
          </span>
        </div>
        <span className="text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
          View &rarr;
        </span>
      </div>
    </Link>
  );
}
