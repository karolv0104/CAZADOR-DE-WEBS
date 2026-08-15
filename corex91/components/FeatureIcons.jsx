import { ShieldCheck, Truck, MapPin } from "lucide-react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Testeado por terceros",
    description:
      "Cada lote se verifica en laboratorio independiente antes de salir a la venta.",
  },
  {
    icon: Truck,
    title: "Envío rápido",
    description: "Pedidos procesados y despachados en 24-48h laborables.",
  },
  {
    icon: MapPin,
    title: "Empresa con base en EE.UU. (Florida)",
    description: "Operación y soporte desde Estados Unidos.",
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
