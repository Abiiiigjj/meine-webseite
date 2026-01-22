import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Sovereign Core | On-Premise KI für Kanzleien",
  description: "Die erste Air-Gapped KI-Infrastruktur für Anwälte und Ärzte. 100% DSGVO-konform. Keine Cloud. Ihre Daten bleiben bei Ihnen.",
  keywords: ["KI", "Kanzlei", "On-Premise", "DSGVO", "Datenschutz", "LLM", "Anwalt", "Legal Tech"],
  authors: [{ name: "Sovereign Core Systems" }],
  openGraph: {
    title: "Sovereign Core | On-Premise KI für Kanzleien",
    description: "KI-Intelligenz für Ihre Kanzlei. Ohne Datenrisiko.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased bg-black text-white">
        {children}
        <Toaster
          position="bottom-right"
          theme="dark"
          toastOptions={{
            style: {
              background: '#0a0a0a',
              border: '1px solid #1a1a1a',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  );
}
