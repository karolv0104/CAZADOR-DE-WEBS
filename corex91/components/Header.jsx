"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/productos", label: "Products" },
  { href: "/coa", label: "COA" },
  { href: "/nosotros", label: "About" },
  { href: "/contacto", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();

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

        <Link
          href="/productos"
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Shop
        </Link>
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
