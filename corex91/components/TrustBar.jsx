const STATS = [
  { value: "99%+", label: "Documented purity" },
  { value: "8x", label: "Tested per batch" },
  { value: "COA", label: "On every product" },
  { value: "24-48h", label: "Shipping" },
];

export default function TrustBar() {
  return (
    <section className="border-y border-surface bg-surface">
      <div className="container-page grid grid-cols-2 gap-8 py-10 md:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-display text-2xl font-bold text-primary md:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
