"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/coa", label: "COA" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-surface bg-white/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-xl font-bold tracking-tight text-primary">
          COREX <span className="text-cyan">91</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  active ? "text-primary" : "text-muted hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openCart}
            className="relative flex h-10 w-10 items-center justify-center rounded-md text-primary hover:bg-surface"
            aria-label="Open cart"
          >
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-cyan px-1 text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </button>

          <Link
            href="/products"
            className="hidden rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:block"
          >
            Shop
          </Link>
        </div>
      </div>

      <nav className="flex items-center gap-5 overflow-x-auto border-t border-surface px-5 py-2 md:hidden">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="whitespace-nowrap text-sm font-medium text-muted"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
