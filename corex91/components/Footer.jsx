import Link from "next/link";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

export default function Footer() {
  return (
    <footer className="border-t border-surface bg-surface">
      <div className="container-page grid gap-10 py-12 md:grid-cols-4">
        <div>
          <p className="font-display text-lg font-bold text-primary">
            COREX <span className="text-cyan">91</span>
          </p>
          <p className="mt-2 text-sm text-muted">Research Sciences</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink">Shop</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <Link href="/products" className="hover:text-primary">
                All products
              </Link>
            </li>
            <li>
              <Link href="/coa" className="hover:text-primary">
                Certificates of Analysis
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <Link href="/about" className="hover:text-primary">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="hover:text-primary">
                WhatsApp
              </a>
            </li>
            <li>
              <a href="mailto:support@corex91.com" className="hover:text-primary">
                support@corex91.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white bg-surface">
        <div className="container-page py-5">
          <p className="legal-disclaimer">
            For laboratory research use only. Not for human or veterinary
            consumption. Products are not intended to diagnose, treat, cure,
            or prevent any disease.
          </p>
          <p className="mt-2 text-xs text-faint">
            © {new Date().getFullYear()} Corex 91 Research Sciences. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
