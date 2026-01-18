import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // WICHTIG: Diese Zeile muss vorhanden sein, damit Docker funktioniert
  output: 'standalone', 
  
  // Falls du experimentelle Features nutzt (optional)
  experimental: {
    // serverActions: true, // nur falls du sie nutzt
  },
};

export default nextConfig;
