"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Copy, Check } from "lucide-react";

const WALLET_ADDRESS =
  process.env.NEXT_PUBLIC_WALLET_ADDRESS || "TU_DIRECCION_TRC20_ACA";

export default function CryptoCheckout({ product }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(WALLET_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable — user can still select the address manually
    }
  }

  return (
    <div className="rounded-lg border border-surface bg-surface p-6">
      <h3 className="font-display text-lg font-bold text-ink">
        Pay with USDT (TRC-20)
      </h3>

      <div className="mt-4 flex items-baseline justify-between rounded-md bg-white p-4">
        <span className="text-sm text-muted">{product.name}</span>
        <span className="text-xl font-bold text-primary">
          ${product.price.toFixed(2)}
        </span>
      </div>

      <div className="mt-5 flex justify-center rounded-md bg-white p-5">
        <QRCodeSVG value={WALLET_ADDRESS} size={168} fgColor="#0B2E4F" />
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          Wallet address (TRC-20)
        </p>
        <div className="mt-1.5 flex items-center gap-2 rounded-md border border-surface bg-white px-3 py-2.5">
          <code className="flex-1 truncate text-sm text-ink">
            {WALLET_ADDRESS}
          </code>
          <button
            type="button"
            onClick={handleCopy}
            className="flex shrink-0 items-center gap-1.5 rounded bg-primary px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      <div className="mt-5 rounded-md border border-cyan/30 bg-cyan/10 p-4">
        <p className="text-sm font-semibold text-primary">
          After sending payment
        </p>
        <p className="mt-1 text-sm text-muted">
          Send the transaction hash (TXID) along with your order details by
          WhatsApp or email so we can confirm your payment manually and ship
          your order.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <a
            href="https://wa.me/10000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Send via WhatsApp
          </a>
          <a
            href={`mailto:support@corex91.com?subject=Order confirmation - ${product.name}`}
            className="rounded-md border border-primary px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            Send via email
          </a>
        </div>
      </div>

      <p className="mt-4 text-[11px] leading-snug text-faint">
        For laboratory research use only. Not for human consumption.
      </p>
    </div>
  );
}
