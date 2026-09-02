import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export const metadata = {
  title: "Products",
  description:
    "Research-grade peptides, third-party tested with COA available on every product.",
};

export default function ProductsPage() {
  return (
    <div className="container-page py-14">
      <div className="mb-10 text-center">
        <h1 className="font-display text-3xl font-bold text-primary">
          Products
        </h1>
        <p className="mt-2 text-sm text-muted">
          Research-grade peptides for laboratory use. Not for human
          consumption.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
