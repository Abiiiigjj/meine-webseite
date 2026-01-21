import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "AI Smart Hack",
  description: "High-Assurance Lead-Gen für Confidential AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased bg-slate-950 text-white">
        {children}
        <Toaster position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}
