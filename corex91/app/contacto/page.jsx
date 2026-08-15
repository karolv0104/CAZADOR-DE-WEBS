import { MessageCircle, Mail } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Corex 91 Research Sciences.",
};

export default function ContactPage() {
  return (
    <div className="container-page py-14">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-3xl font-bold text-primary">
          Contact
        </h1>
        <p className="mt-2 text-sm text-muted">
          Questions about an order, a COA, or bulk pricing — reach us here.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-3xl gap-8 md:grid-cols-2">
        <div className="rounded-lg border border-surface p-6">
          <ContactForm />
        </div>

        <div className="space-y-4">
          <a
            href="https://wa.me/10000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-surface p-5 transition-colors hover:border-cyan"
          >
            <MessageCircle size={22} className="text-primary" />
            <div>
              <p className="font-display text-sm font-bold text-ink">
                WhatsApp
              </p>
              <p className="text-xs text-muted">
                Fastest way to reach us — order and shipping questions.
              </p>
            </div>
          </a>

          <a
            href="mailto:support@corex91.com"
            className="flex items-center gap-3 rounded-lg border border-surface p-5 transition-colors hover:border-cyan"
          >
            <Mail size={22} className="text-primary" />
            <div>
              <p className="font-display text-sm font-bold text-ink">
                support@corex91.com
              </p>
              <p className="text-xs text-muted">
                COA requests, bulk pricing, general questions.
              </p>
            </div>
          </a>

          <p className="legal-disclaimer pt-2">
            For laboratory research use only. Not for human or veterinary
            consumption. Products are not intended to diagnose, treat, cure,
            or prevent any disease.
          </p>
        </div>
      </div>
    </div>
  );
}
