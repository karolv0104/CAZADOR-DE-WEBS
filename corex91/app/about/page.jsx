import { Microscope, ShieldCheck, FlaskConical } from "lucide-react";

export const metadata = {
  title: "About",
  description:
    "Corex 91's mission: research-grade peptides with a documented, verifiable focus on purity.",
};

const PILLARS = [
  {
    icon: Microscope,
    title: "Research-first",
    description:
      "Every product we sell is manufactured and labeled for laboratory research use only — never marketed or intended for human consumption.",
  },
  {
    icon: ShieldCheck,
    title: "Verified purity",
    description:
      "We work with independent third-party laboratories to test every batch before it reaches a customer, and back that with a documented Certificate of Analysis.",
  },
  {
    icon: FlaskConical,
    title: "Consistency by lot",
    description:
      "Each vial carries its own lot number so results and testing can be traced back to the exact batch it came from.",
  },
];

export default function AboutPage() {
  return (
    <div className="container-page py-14">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-cyan">
          About Corex 91
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-primary">
          A research-focused approach to peptide sourcing.
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Corex 91 Research Sciences exists to supply laboratories and
          researchers with consistently sourced, third-party tested peptides.
          Our focus stops at the point of sale: what customers do with our
          products in their own research is their responsibility, and none of
          our products are intended, labeled, or marketed for human or
          veterinary consumption.
        </p>
      </div>

      <div className="mt-14 grid gap-10 md:grid-cols-3">
        {PILLARS.map(({ icon: Icon, title, description }) => (
          <div key={title} className="rounded-lg border border-surface p-6">
            <Icon size={28} strokeWidth={1.5} className="text-primary" />
            <h3 className="mt-4 font-display text-base font-bold text-ink">
              {title}
            </h3>
            <p className="mt-2 text-sm text-muted">{description}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-14 max-w-2xl rounded-lg bg-surface p-6 text-center">
        <p className="legal-disclaimer">
          For laboratory research use only. Not for human or veterinary
          consumption. Products are not intended to diagnose, treat, cure, or
          prevent any disease.
        </p>
      </div>
    </div>
  );
}
