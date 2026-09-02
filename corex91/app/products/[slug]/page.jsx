import { notFound } from "next/navigation";
import { products, getProductBySlug } from "@/lib/products";
import VialGraphic from "@/components/VialGraphic";
import ProductPurchasePanel from "@/components/ProductPurchasePanel";

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

  const weightOptions = product.variants.map((v) => v.weight).join(" / ");

  return (
    <div className="container-page py-14">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="flex justify-center">
          <VialGraphic
            name={product.name}
            weight={weightOptions}
            price={null}
            lot={product.lot}
            size={180}
          />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan">
            {product.category}
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold text-primary">
            {product.name}
          </h1>

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
                Available weight
              </dt>
              <dd className="mt-1 text-sm font-semibold text-ink">
                {weightOptions}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-faint">
                Lot number
              </dt>
              <dd className="mt-1 text-sm font-semibold text-ink">
                C91-{product.lot}
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

          <div className="mt-8">
            <ProductPurchasePanel product={product} />
          </div>

          <p className="mt-6 legal-disclaimer">
            For laboratory research use only. Not for human or veterinary
            consumption. Products are not intended to diagnose, treat, cure,
            or prevent any disease.
          </p>
        </div>
      </div>
    </div>
  );
}
