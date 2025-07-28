# 🌿 jonaebert.de

[![License: MIT](https://img.shields.io/github/license/jonaebert/jonaebert.de)](https://github.com/jonaebert/jonaebert.de/blob/main/LICENSE)

[![Release](https://img.shields.io/github/v/release/jonaebert/jonaebert.de?logo=github)](https://github.com/jonaebert/jonaebert.de/releases)
![Last Release Date](https://img.shields.io/badge/release%20date-July%2028%2C%202025-informational?logo=github)
![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-blue?logo=nodedotjs)

**Persönliche Website von Jona Ebert (they/them)**  
Erstellt mit **SvelteKit**, gestaltet mit **Tailwind CSS**, gehostet auf **Hetzner Cloud** via **Coolify**, mit einem Basisdesign von **BÜNDNIS 90/DIE GRÜNEN**.

---

## 🚀 Technik & Hosting

- **Frontend**: SvelteKit (SSR via `@sveltejs/adapter‑node`)
- **Styling**: Tailwind CSS (angepasst an das GRÜNE CI/CD)
- **CMS**: Strapi (selbstgehostet, API-basiert)
- **Deployments**: Vollautomatisiert über Coolify bei neuem Release
- **Server**: Hetzner Cloud VPS mit Docker

---

## ✨ Features

- **Server-Side Rendering (SSR)** für blitzschnelle Ladezeiten und SEO
- **CMS-gestützter Blog**: Inhalte & Medien über **Strapi** verwaltet
- **REST Integration**: Inhalte dynamisch via API geladen
- **Responsives, barrierefreies Design** mit Fokus auf Nachhaltigkeit
- **Headless Architektur**: separates Frontend & Backend für maximale Flexibilität
- **Automatischer HTTPS-Support, Backups & Rollbacks** durch Coolify
- **Dark Mode**, strukturierte OG-Meta-Tags & PWA-ready - Dark Mode (Work in Progress)

---

## 📦 Entwicklung & lokale Vorschau

```bash
git clone https://github.com/jonaebert/jonaebert.de.git
cd jonaebert.de
npm install
npm run dev
