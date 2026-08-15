import { notFound } from "next/navigation";
import { products, getProductBySlug, getLotNumber } from "@/lib/products";
import ProductLabel from "@/components/ProductLabel";
import CryptoCheckout from "@/components/CryptoCheckout";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }) {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
  };
}

export default function ProductPage({ params }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const lot = getLotNumber(product.slug);
  const hasDiscount = product.priceOriginal > product.price;

  return (
    <div className="container-page py-14">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="mx-auto w-full max-w-sm">
          <ProductLabel product={product} />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan">
            {product.category}
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold text-primary">
            {product.name}
          </h1>

          <div className="mt-4 flex items-baseline gap-3">
            {hasDiscount && (
              <span className="text-lg text-muted line-through">
                ${product.priceOriginal.toFixed(2)}
              </span>
            )}
            <span className="text-2xl font-bold text-cyan">
              {product.priceIsFrom && "From "}${product.price.toFixed(2)}
            </span>
          </div>
          {product.priceIsFrom && (
            <p className="mt-1.5 text-xs text-muted">
              Price varies by dose — contact us to confirm before paying.
            </p>
          )}

          <p className="mt-5 text-sm leading-relaxed text-muted">
            {product.description}
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-4 rounded-lg border border-surface p-5">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-faint">
                Purity
              </dt>
              <dd className="mt-1 text-sm font-semibold text-ink">
                {product.purity}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-faint">
                Weight
              </dt>
              <dd className="mt-1 text-sm font-semibold text-ink">
                {product.weight}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-faint">
                Lot number
              </dt>
              <dd className="mt-1 text-sm font-semibold text-ink">
                C91-{lot}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-faint">
                Category
              </dt>
              <dd className="mt-1 text-sm font-semibold text-ink">
                {product.category}
              </dd>
            </div>
          </dl>

          <p className="mt-6 legal-disclaimer">
            For laboratory research use only. Not for human or veterinary
            consumption. Products are not intended to diagnose, treat, cure,
            or prevent any disease.
          </p>

          <div className="mt-8">
            <CryptoCheckout product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
