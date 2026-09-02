import { ShieldCheck, Truck, MapPin } from "lucide-react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Third-party tested",
    description:
      "Every batch is verified by an independent laboratory before it goes on sale.",
  },
  {
    icon: Truck,
    title: "Fast shipping",
    description: "Orders processed and shipped within 24-48 business hours.",
  },
  {
    icon: MapPin,
    title: "U.S.-based company (Florida)",
    description: "Operations and support run from the United States.",
  },
];

export default function FeatureIcons() {
  return (
    <section className="container-page py-16">
      <div className="grid gap-10 md:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <div key={title} className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-surface">
              <Icon size={26} strokeWidth={1.5} className="text-primary" />
            </div>
            <h3 className="mt-4 font-display text-base font-bold text-ink">
              {title}
            </h3>
            <p className="mt-1.5 text-sm text-muted">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
