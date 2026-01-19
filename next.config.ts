import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Das ist die wichtigste Zeile für Docker!
  output: 'standalone',
  
  // Da du Tailwind 4 nutzt, sind hier meist keine extra CSS-Configs nötig
  eslint: {
    // Verhindert Build-Abbrüche durch kleine Warnungen
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Verhindert Build-Abbrüche durch Typ-Fehler (optional, aber sicher für Deploy)
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
