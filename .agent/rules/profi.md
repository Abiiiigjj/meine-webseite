---
trigger: always_on
---

~/mein-nextjs-projekt-lokal/
├── .github/workflows/
│   └── deploy.yml          # CI/CD Pipeline (Push -> Deploy)
├── app/
│   ├── page.tsx            # Landing Page (Hero, Trust, Pricing)
│   ├── layout.tsx          # Global Font & Metadata
│   └── globals.css         # Tailwind directives
├── components/
│   └── LeadForm.tsx        # Supabase Lead Capture Formular
├── utils/supabase/
│   └── client.ts           # Supabase Client Instanz
├── Dockerfile              # Production Multi-Stage Build
├── next.config.ts          # output: 'standalone'
├── tailwind.config.ts      # Theme Config
└── .env.local              # Secrets (NICHT im Git!)


🏗️ SYSTEM BLUEPRINT: AI Smart Hack (B2B Platform)
1. Projekt-Identität
Name: AI Smart Hack

Domain: aismarthack.com

Mission: High-Assurance Lead-Gen Plattform für Confidential AI (On-Premise LLMs für Anwälte/Ärzte).

Design-Philosophie: "Trust & Sovereignty". Dark Mode, Minimalistisch, High-Performance, Seriös.

2. Tech Stack (Strict)
Frontend: Next.js 14+ (App Router, TypeScript).

Styling: Tailwind CSS, Lucide React Icons.

Backend / DB: Supabase (PostgreSQL, Auth, RLS).

Container: Docker (Multi-Stage Build, Alpine Node).

Server: Ubuntu VPS (Nginx Reverse Proxy -> Docker Port 3000).

CI/CD: GitHub Actions (Build -> GHCR -> Deploy via SSH).

3. Infrastruktur & Ports
Host (VPS):

Port 80/443: Nginx (Terminiert SSL, leitet weiter an localhost:3000).

SSH: Key-based Auth only.

Docker Container (nextjs-app):

Exposed: Port 3000.

User: nextjs (non-root security).

Env: .env.local wird injected.