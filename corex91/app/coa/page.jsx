import { FileText } from "lucide-react";
import { products, getLotNumber } from "@/lib/products";

export const metadata = {
  title: "Certificates of Analysis",
  description:
    "Third-party Certificate of Analysis for every Corex 91 research peptide.",
};

// No PDFs are wired up yet — every product falls back to "available on request".
// Swap an entry here (e.g. { slug: "bpc-157", pdfUrl: "/coa/bpc-157.pdf" }) once
// a real COA file exists for that lot.
const coaFiles = {};

export default function CoaPage() {
  return (
    <div className="container-page py-14">
      <div className="mb-10 text-center">
        <h1 className="font-display text-3xl font-bold text-primary">
          Certificates of Analysis
        </h1>
        <p className="mt-2 text-sm text-muted">
          Every batch is verified by independent third-party laboratory
          testing.
        </p>
      </div>

      <div className="mx-auto max-w-2xl divide-y divide-surface rounded-lg border border-surface">
        {products.map((product) => {
          const lot = getLotNumber(product.slug);
          const pdfUrl = coaFiles[product.slug];

          return (
            <div
              key={product.slug}
              className="flex items-center justify-between gap-4 p-5"
            >
              <div className="flex items-center gap-3">
                <FileText size={22} strokeWidth={1.5} className="text-primary" />
                <div>
                  <p className="font-display text-sm font-bold text-ink">
                    {product.name}
                  </p>
                  <p className="text-xs text-muted">Lot #C91-{lot}</p>
                </div>
              </div>

              {pdfUrl ? (
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-md bg-primary px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                >
                  View COA
                </a>
              ) : (
                <span className="shrink-0 text-xs font-medium text-faint">
                  On request
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="mx-auto mt-8 max-w-2xl rounded-lg bg-surface p-6 text-center">
        <p className="text-sm text-muted">
          Certificado de análisis disponible bajo pedido — contactanos por
          WhatsApp o email.
        </p>
        <div className="mt-4 flex justify-center gap-3">
          <a
            href="https://wa.me/10000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            WhatsApp
          </a>
          <a
            href="mailto:support@corex91.com?subject=COA request"
            className="rounded-md border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            Email
          </a>
        </div>
      </div>
    </div>
  );
}
