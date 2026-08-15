const STATS = [
  { value: "99%+", label: "Pureza documentada" },
  { value: "8x", label: "Testeado por lote" },
  { value: "COA", label: "En cada producto" },
  { value: "24-48h", label: "Envío" },
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
