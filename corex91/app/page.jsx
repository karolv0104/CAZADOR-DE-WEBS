import Link from "next/link";
import { FileCheck2, PackagePlus } from "lucide-react";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import TrustBar from "@/components/TrustBar";
import FeatureIcons from "@/components/FeatureIcons";

const FEATURED_SLUGS = [
  "bpc-157",
  "tb-500",
  "glp-1s",
  "ghk-cu",
  "selank",
  "nad",
];

export default function HomePage() {
  const featured = FEATURED_SLUGS.map((slug) =>
    products.find((p) => p.slug === slug),
  ).filter(Boolean);

  return (
    <>
      <section className="relative overflow-hidden bg-primary py-24 text-center md:py-32">
        {/* Cinematic scientific backdrop — glowing depth + lab grid, pure CSS */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-10%] h-[560px] w-[560px] -translate-x-1/2 animate-pulse rounded-full bg-cyan/20 blur-[120px]" />
          <div className="absolute -left-24 bottom-[-10%] h-72 w-72 rounded-full bg-cyan/10 blur-[110px]" />
          <div className="absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-cyan/10 blur-[110px]" />
        </div>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="container-page relative">
          <p className="font-display text-sm font-semibold tracking-widest text-cyan">
            COREX 91
          </p>
          <h1 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-bold leading-tight text-white md:text-5xl">
            Research-grade peptides for laboratory use.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-[#B8C4CE]">
            Third-party tested. Certificate of Analysis on every product.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link
              href="/products"
              className="rounded-md bg-cyan px-6 py-3 text-sm font-semibold text-primary transition-opacity hover:opacity-90"
            >
              Shop products
            </Link>
            <Link
              href="/coa"
              className="rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              View COAs
            </Link>
          </div>
        </div>
      </section>

      <TrustBar />
      <FeatureIcons />

      <section className="container-page py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-2xl font-bold text-primary">
            Featured products
          </h2>
          <Link
            href="/products"
            className="text-sm font-semibold text-primary hover:underline"
          >
            View all &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="border-y border-surface bg-surface">
        <div className="container-page flex flex-col items-center gap-4 py-16 text-center">
          <FileCheck2 size={36} strokeWidth={1.5} className="text-primary" />
          <h2 className="font-display text-2xl font-bold text-primary">
            Purity You Can Verify
          </h2>
          <p className="max-w-xl text-sm text-muted">
            Quality starts with verification. Every batch undergoes
            independent third-party laboratory testing and is backed by a
            documented Certificate of Analysis.
          </p>
          <Link
            href="/coa"
            className="mt-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            View all results
          </Link>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="flex flex-col items-center gap-3 rounded-lg bg-primary px-6 py-12 text-center">
          <PackagePlus size={32} strokeWidth={1.5} className="text-cyan" />
          <h2 className="font-display text-2xl font-bold text-white">
            Bundle &amp; Save
          </h2>
          <p className="text-sm text-[#B8C4CE]">Volume discounts available.</p>
          <p className="text-sm text-[#B8C4CE]">
            Free shipping on orders over $200.
          </p>
          <Link
            href="/products"
            className="mt-3 rounded-md bg-cyan px-6 py-3 text-sm font-semibold text-primary transition-opacity hover:opacity-90"
          >
            Shop products
          </Link>
        </div>
      </section>
    </>
  );
}
