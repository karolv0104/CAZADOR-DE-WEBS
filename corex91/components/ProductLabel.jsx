import { FlaskConical } from "lucide-react";
import { getLotNumber } from "@/lib/products";

/**
 * The Corex 91 vial label — this is the branded identity that wraps every
 * product, standing in for real product photography. It's what makes a
 * product "ours" rather than the generic peptide it's built from.
 */
export default function ProductLabel({ product }) {
  const lot = getLotNumber(product.slug);

  return (
    <div className="overflow-hidden rounded-lg border border-surface">
      <div className="flex aspect-square items-center justify-center bg-surface">
        <FlaskConical size={72} strokeWidth={1.25} className="text-primary" />
      </div>

      <div className="bg-primary px-4 py-3">
        <p className="font-display text-lg font-bold leading-none text-white">
          COREX <span className="text-cyan">91</span>
        </p>
        <p className="mt-1.5 text-[10px] font-semibold tracking-[0.2em] text-[#B8C4CE]">
          RESEARCH SCIENCES
        </p>
      </div>

      <div className="bg-white px-4 py-3">
        <p className="font-display text-base font-bold text-ink">
          {product.name}
        </p>
        <p className="mt-0.5 text-xs text-muted">
          {product.weight} &middot; {product.category}
        </p>

        <div className="mt-3 flex items-center justify-between text-xs text-muted">
          <span>Purity {product.purity}</span>
          <span>
            Lot #C91-{lot}
          </span>
        </div>

        <p className="mt-3 text-[10px] leading-snug text-faint">
          For laboratory research use only. Not for human consumption.
        </p>
      </div>
    </div>
  );
}
