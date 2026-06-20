# Pucora Marketing Website

Website for [Pucora](https://github.com/pucora/pucora-ce) — built with Vite, React, TypeScript, and Tailwind CSS.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

Static output is in `dist/`.

## Site structure

- **Home** — Hero, pillars, stats, features, testimonials, get started
-- **Products** — Community Edition, Configurator, Lura Engine (originally by KrakenD)
- **Solutions** — Microservices/BFF, Event-driven, Legacy, Real-time
- **Features** — 7 capability pages + connectivity hub (15 protocols)
- **Resources** — Documentation, community, downloads

## Tech stack

- Vite + React 19 + TypeScript
- React Router v7
- Tailwind CSS v4
- Framer Motion
- react-helmet-async

## Deploy

GitHub Actions workflow at `.github/workflows/deploy.yml` builds and deploys to GitHub Pages when pushed to `main`.
