import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import ResearchBanner from "@/components/ResearchBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgeGateModal from "@/components/AgeGateModal";
import ChatWidget from "@/components/ChatWidget";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Corex 91 | Research-Grade Peptides",
    template: "%s | Corex 91",
  },
  description:
    "Research-grade peptides for laboratory use. Third-party tested, COA available on every product. For laboratory research use only — not for human consumption.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-body bg-white text-ink antialiased">
        <CartProvider>
          <AgeGateModal />
          <ResearchBanner />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
          <ChatWidget />
          <WhatsAppFloatingButton />
        </CartProvider>
      </body>
    </html>
  );
}
